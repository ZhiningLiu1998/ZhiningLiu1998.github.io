const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const backToTop = document.getElementById("backToTop");

function setActiveNav() {
  const scrollPosition = window.scrollY + 120;
  let activeId = sections[0].id;
  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) activeId = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + activeId);
  });
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

const zhihuFollowersBadge = document.getElementById("zhihuFollowersBadge");

if (zhihuFollowersBadge) {
  fetch(zhihuFollowersBadge.src)
    .then(response => {
      if (!response.ok) throw new Error(`Zhihu badge request failed: ${response.status}`);
      return response.text();
    })
    .then(svg => {
      const badgeLabel = new DOMParser()
        .parseFromString(svg, "image/svg+xml")
        .documentElement
        .getAttribute("aria-label");
      const followerCount = Number(badgeLabel?.match(/^Zhihu:\s*([\d,]+)\s+Followers$/i)?.[1].replaceAll(",", ""));
      if (!Number.isFinite(followerCount)) return;

      const compactCount = new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(followerCount);
      const compactBadgeUrl = new URL("https://img.shields.io/static/v1");
      compactBadgeUrl.search = new URLSearchParams({
        label: "Zhihu",
        message: `${compactCount} Followers`,
        labelColor: "d8ecff",
        color: "f4f7fa",
        logo: "zhihu",
        logoColor: "0084ff",
        style: "flat",
      });
      zhihuFollowersBadge.src = compactBadgeUrl;
    })
    .catch(() => {});
}

const pubFilter = document.getElementById("pubFilter");
const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const pubItems = Array.from(document.querySelectorAll(".pub-item"));
const pubShowAll = document.getElementById("pubShowAll");
const maxCollapsedPapers = 10;
const minDefaultFilterCount = 3;
let activePublicationFilter = "all";
let publicationsExpanded = false;
let publicationFiltersExpanded = false;

function getFilteredPublications(filter) {
  if (filter === "all") return pubItems;
  return pubItems.filter(item => item.dataset.tags.split(" ").includes(filter));
}

function applyPublicationFilter() {
  const filteredItems = getFilteredPublications(activePublicationFilter);
  const visibleLimit = publicationsExpanded ? filteredItems.length : maxCollapsedPapers;

  pubItems.forEach(item => item.classList.add("hidden"));
  filteredItems.forEach((item, index) => {
    item.classList.toggle("hidden", index >= visibleLimit);
  });

  const shouldCollapse = filteredItems.length > maxCollapsedPapers && !publicationsExpanded;
  pubShowAll.classList.toggle("visible", shouldCollapse);
  pubShowAll.textContent = `Show all ${filteredItems.length} papers`;
}

filterButtons.forEach(button => {
  const filter = button.dataset.filter;
  const count = getFilteredPublications(filter).length;
  button.dataset.count = String(count);
  button.insertAdjacentHTML("beforeend", ` <span class="filter-count">(${count})</span>`);
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activePublicationFilter = filter;
    publicationsExpanded = false;
    applyPublicationFilter();
  });
});

const lowFrequencyFilterButtons = filterButtons.filter(button => {
  return button.dataset.filter !== "all" && Number(button.dataset.count) < minDefaultFilterCount;
});

function setPublicationFiltersExpanded(isExpanded) {
  publicationFiltersExpanded = isExpanded;
  if (!publicationFiltersExpanded) {
    const activeFilterButton = filterButtons.find(button => button.classList.contains("active"));
    if (activeFilterButton && lowFrequencyFilterButtons.includes(activeFilterButton)) {
      filterButtons.forEach(button => button.classList.remove("active"));
      filterButtons[0].classList.add("active");
      activePublicationFilter = "all";
      publicationsExpanded = false;
      applyPublicationFilter();
    }
  }
  lowFrequencyFilterButtons.forEach(button => {
    button.classList.toggle("filter-hidden", !publicationFiltersExpanded);
  });
}

if (lowFrequencyFilterButtons.length > 0) {
  const filterToggle = document.createElement("button");
  filterToggle.className = "filter-btn";
  filterToggle.type = "button";
  filterToggle.setAttribute("aria-expanded", "false");
  filterToggle.textContent = `Show all tags (+${lowFrequencyFilterButtons.length})`;
  filterToggle.addEventListener("click", () => {
    setPublicationFiltersExpanded(!publicationFiltersExpanded);
    filterToggle.setAttribute("aria-expanded", String(publicationFiltersExpanded));
    filterToggle.textContent = publicationFiltersExpanded
      ? "Show fewer tags"
      : `Show all tags (+${lowFrequencyFilterButtons.length})`;
  });
  pubFilter.appendChild(filterToggle);
  setPublicationFiltersExpanded(false);
}

pubShowAll.addEventListener("click", () => {
  publicationsExpanded = true;
  applyPublicationFilter();
});
applyPublicationFilter();
document.documentElement.classList.add("js-ready");


const galleryGrid = document.getElementById("galleryGrid");
const galleryActions = document.getElementById("galleryActions");
const galleryShowMore = document.getElementById("galleryShowMore");
const galleryShowAll = document.getElementById("galleryShowAll");
const galleryShowAllLocations = document.getElementById("galleryShowAllLocations");
const galleryViewButtons = Array.from(document.querySelectorAll("[data-gallery-view]"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const galleryBatchSize = 10;
const mobileGalleryQuery = window.matchMedia("(max-width: 640px)");
function initialGalleryItemCount() {
  return mobileGalleryQuery.matches ? 10 : 20;
}
let visibleGalleryCount = Math.min(initialGalleryItemCount(), galleryPhotos.length);
let visibleLocationCount = initialGalleryItemCount();
let renderedGalleryCount = 0;
let activeGalleryView = "time";
let activeLightboxIndexes = [];
let currentPhotoPosition = 0;
let lightboxTouchStart = null;
let suppressNextLightboxClick = false;
let lightboxFeedbackTimer = null;

function clearLightboxNavHint() {
  lightbox.classList.remove("hint-prev", "hint-next", "hint-close");
}

function updateLightboxNavEdges() {
  lightbox.style.setProperty("--lightbox-prev-edge", "34px");
  lightbox.style.setProperty("--lightbox-next-edge", "34px");
}

function updateLightboxNavHint(event) {
  const imageBounds = lightboxImg.getBoundingClientRect();
  updateLightboxNavEdges();
  if (event.clientY < imageBounds.top || event.clientY > imageBounds.bottom) {
    lightbox.classList.remove("hint-prev", "hint-next");
    lightbox.classList.add("hint-close");
    return;
  }
  const showPrevious = event.clientX < window.innerWidth / 2;
  lightbox.classList.remove("hint-close");
  lightbox.classList.toggle("hint-prev", showPrevious);
  lightbox.classList.toggle("hint-next", !showPrevious);
}

function showLightboxNavFeedback(direction) {
  clearTimeout(lightboxFeedbackTimer);
  lightbox.classList.remove("flash-prev", "flash-next");
  lightbox.classList.add(direction < 0 ? "flash-prev" : "flash-next");
  lightboxFeedbackTimer = setTimeout(() => {
    lightbox.classList.remove("flash-prev", "flash-next");
  }, 180);
}

function moveLightboxByArrow(direction, button) {
  button.classList.remove("arrow-flash");
  button.offsetWidth;
  button.classList.add("arrow-flash");
  window.setTimeout(() => button.classList.remove("arrow-flash"), 180);
  moveLightbox(direction);
}

function openLightbox(position, indexes) {
  activeLightboxIndexes = indexes;
  currentPhotoPosition = position;
  const photo = galleryPhotos[activeLightboxIndexes[currentPhotoPosition]];
  lightboxImg.classList.remove("portrait", "landscape");
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxCaption.textContent = `${currentPhotoPosition + 1} / ${activeLightboxIndexes.length} - ${photo.caption}`;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  clearLightboxNavHint();
  lightbox.classList.remove("flash-prev", "flash-next");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

function moveLightbox(direction) {
  currentPhotoPosition = (currentPhotoPosition + direction + activeLightboxIndexes.length) % activeLightboxIndexes.length;
  openLightbox(currentPhotoPosition, activeLightboxIndexes);
}

function handleLightboxClick(event) {
  if (event.target.closest("button")) return;
  if (suppressNextLightboxClick) {
    suppressNextLightboxClick = false;
    return;
  }
  const imageBounds = lightboxImg.getBoundingClientRect();
  if (event.clientY < imageBounds.top || event.clientY > imageBounds.bottom) {
    closeLightbox();
    return;
  }
  const direction = event.clientX < window.innerWidth / 2 ? -1 : 1;
  updateLightboxNavEdges();
  showLightboxNavFeedback(direction);
  moveLightbox(direction);
}

function startLightboxSwipe(event) {
  if (event.touches.length !== 1) return;
  const touch = event.touches[0];
  lightboxTouchStart = { x: touch.clientX, y: touch.clientY };
}

function finishLightboxSwipe(event) {
  if (!lightboxTouchStart || event.changedTouches.length !== 1) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - lightboxTouchStart.x;
  const deltaY = touch.clientY - lightboxTouchStart.y;
  lightboxTouchStart = null;
  if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
  event.preventDefault();
  suppressNextLightboxClick = true;
  const direction = deltaX < 0 ? 1 : -1;
  updateLightboxNavEdges();
  showLightboxNavFeedback(direction);
  moveLightbox(direction);
}

lightboxImg.addEventListener("load", () => {
  lightboxImg.classList.toggle("portrait", lightboxImg.naturalHeight > lightboxImg.naturalWidth);
  lightboxImg.classList.toggle("landscape", lightboxImg.naturalWidth >= lightboxImg.naturalHeight);
});

function thumbnailSrc(src) {
  return src.replace("images/gallery/processed/", "images/gallery/thumbs/").replace(/\.[^.]+$/, ".jpg");
}

function updateGalleryButton() {
  const remainingImages = galleryPhotos.length - visibleGalleryCount;
  galleryActions.classList.toggle("visible", remainingImages > 0);
  galleryShowMore.style.display = "";
  galleryShowAll.style.display = "";
  galleryShowAllLocations.style.display = "none";
  galleryShowMore.textContent = `Show 10 more (${remainingImages} remaining)`;
  galleryShowAll.textContent = `Show all ${galleryPhotos.length} images`;
}

function updateLocationButton(totalLocations) {
  const hasHiddenLocations = visibleLocationCount < totalLocations;
  galleryActions.classList.toggle("visible", hasHiddenLocations);
  galleryShowMore.style.display = "none";
  galleryShowAll.style.display = "none";
  galleryShowAllLocations.style.display = "";
  galleryShowAllLocations.textContent = `Show all ${totalLocations} locations`;
}

function visibleTimeIndexes() {
  return galleryPhotos.slice(0, visibleGalleryCount).map((_, index) => index);
}

function appendGalleryItems() {
  galleryPhotos.slice(renderedGalleryCount, visibleGalleryCount).forEach((photo, offset) => {
    const index = renderedGalleryCount + offset;
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    const loading = index < 2 ? "eager" : "lazy";
    item.innerHTML = `<img src="${thumbnailSrc(photo.src)}" data-full-src="${photo.src}" alt="${photo.caption}" width="260" height="260" loading="${loading}" decoding="async" fetchpriority="${index === 0 ? "high" : "low"}"><span>${photo.caption}</span>`;
    item.addEventListener("click", () => openLightbox(index, visibleTimeIndexes()));
    galleryGrid.appendChild(item);
  });
  renderedGalleryCount = visibleGalleryCount;
  updateGalleryButton();
}

function locationNameFromCaption(caption) {
  const location = caption.replace(/,\s*\d{4}$/, "");
  const place = location.split(",")[0].trim();
  const aliases = {
    "Badlands National Park": "Badlands NP",
    Champaign: "Champaign",
    "Grand Teton National Park": "Grand Teton NP",
    "Half Moon Bay": "Bay Area",
    "Mission Peak": "Bay Area",
    Roppongi: "Tokyo",
    "Russian Ridge": "Bay Area",
    "San Jose": "Bay Area",
    "Santa Clara": "Bay Area",
    Shibuya: "Tokyo",
    Shinjuku: "Tokyo",
    "Yellowstone National Park": "Yellowstone NP"
  };
  return aliases[place] || place;
}

function yearFromCaption(caption) {
  const match = caption.match(/(\d{4})$/);
  return match ? Number(match[1]) : null;
}

function regionFromCaption(caption) {
  const parts = caption.replace(/,\s*\d{4}$/, "").split(",").map(part => part.trim());
  if (parts.length < 2) return "";
  const regionNames = {
    CA: "California",
    IL: "Illinois",
    SD: "South Dakota",
    WA: "Washington",
    WY: "Wyoming"
  };
  return regionNames[parts[1]] || parts[1];
}

const preferredLocationCovers = {
  Aomori: "images/gallery/processed/202601 Aomori.JPG",
  "Badlands NP": "images/gallery/processed/202605 Badlands NP (2).JPG",
  "Bay Area": "images/gallery/processed/202506 Mission Peak.jpg",
  Budapest: "images/gallery/processed/202508 Budapest (3).JPG",
  Changchun: "images/gallery/processed/202011 Changchun (3).JPG",
  Chengdu: "images/gallery/processed/202106 Chengdu (2).JPG",
  Chongqing: "images/gallery/processed/202106 Chongqing.JPG",
  "Grand Teton NP": "images/gallery/processed/202605 Grand Teton (2).JPG",
  Istanbul: "images/gallery/processed/202312 Istanbul.jpg",
  Kyoto: "images/gallery/processed/202412 Kyoto.JPG",
  "Lake Tahoe": "images/gallery/processed/202407 Lake Tahoe.jpg",
  "Los Angeles": "images/gallery/processed/202308 Los Angeles (2).jpg",
  Monterey: "images/gallery/processed/202406 Monterey.jpg",
  Prague: "images/gallery/processed/202407 Prague (2).JPG",
  "Rio de Janeiro": "images/gallery/processed/202604 Rio de Janeiro.jpg",
  "San Diego": "images/gallery/processed/202512 San Diego (2).JPG",
  "San Francisco": "images/gallery/processed/202507 San Francisco (3).JPG",
  Seattle: "images/gallery/processed/202306 Seattle.jpg",
  Shenzhen: "images/gallery/processed/202205 Shenzhen (2).jpg",
  Yokohama: "images/gallery/processed/202601 Yokohama (2).jpg",
  "Yellowstone NP": "images/gallery/processed/202605 Yellowstone (2).JPG"
};

function photoDateKey(photo) {
  const match = photo.src.match(/\/(\d{6})\s/);
  return match ? Number(match[1]) : 0;
}

function galleryLocationGroups() {
  const groups = new Map();
  galleryPhotos.forEach((photo, index) => {
    const location = locationNameFromCaption(photo.caption);
    if (!groups.has(location)) groups.set(location, { location, indexes: [], years: [], regions: [], dateKeys: [], order: groups.size });
    const group = groups.get(location);
    group.indexes.push(index);
    const year = yearFromCaption(photo.caption);
    if (year && !group.years.includes(year)) group.years.push(year);
    const region = regionFromCaption(photo.caption);
    if (region && !group.regions.includes(region)) group.regions.push(region);
    const dateKey = photoDateKey(photo);
    if (dateKey) group.dateKeys.push(dateKey);
  });
  return Array.from(groups.values()).sort((a, b) => {
    const latestA = a.dateKeys.length ? Math.max(...a.dateKeys) : 0;
    const latestB = b.dateKeys.length ? Math.max(...b.dateKeys) : 0;
    return latestB - latestA || a.order - b.order;
  }).map(group => {
    const preferredSrc = preferredLocationCovers[group.location];
    if (!preferredSrc) return group;
    const preferredIndex = group.indexes.findIndex(index => galleryPhotos[index].src === preferredSrc);
    if (preferredIndex <= 0) return group;
    group.indexes.unshift(group.indexes.splice(preferredIndex, 1)[0]);
    return group;
  });
}

function locationLightboxIndexes(locationGroups) {
  return locationGroups.flatMap(group => group.indexes);
}

function formatYearRange(years) {
  const sortedYears = years.slice().sort((a, b) => a - b);
  if (sortedYears.length === 1) return String(sortedYears[0]);
  return `${sortedYears[0]} - ${sortedYears[sortedYears.length - 1]}`;
}

function tuneLocationOverlay(item, image) {
  const applyOverlay = () => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context || !image.naturalWidth || !image.naturalHeight) return;

      const sampleSize = 64;
      const sourceSize = Math.min(image.naturalWidth, image.naturalHeight) * 0.5;
      const sourceX = (image.naturalWidth - sourceSize) / 2;
      const sourceY = (image.naturalHeight - sourceSize) / 2;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, sampleSize, sampleSize);

      const pixels = context.getImageData(0, 0, sampleSize, sampleSize).data;
      let luminance = 0;
      for (let index = 0; index < pixels.length; index += 4) {
        luminance += 0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2];
      }
      luminance /= pixels.length / 4;
      const overlayOpacity = Math.min(0.58, Math.max(0.16, 0.12 + (luminance / 255) * 0.54));
      item.style.setProperty("--city-overlay-opacity", overlayOpacity.toFixed(2));
    } catch (error) {
      item.style.setProperty("--city-overlay-opacity", "0.34");
    }
  };

  if (image.complete) {
    applyOverlay();
  } else {
    image.addEventListener("load", applyOverlay, { once: true });
    image.addEventListener("error", () => item.style.setProperty("--city-overlay-opacity", "0.34"), { once: true });
  }
}

function renderLocationGallery() {
  galleryGrid.innerHTML = "";
  const locationGroups = galleryLocationGroups();
  const visibleLocationGroups = locationGroups.slice(0, visibleLocationCount);
  const lightboxIndexes = locationLightboxIndexes(visibleLocationGroups);
  visibleLocationGroups.forEach(group => {
    const item = document.createElement("button");
    item.className = "gallery-item gallery-city-card";
    item.type = "button";
    const coverPhoto = galleryPhotos[group.indexes[0]];
    const imageText = group.indexes.length === 1 ? "1 image" : `${group.indexes.length} images`;
    const regionText = group.regions.length > 0 ? `<span class="gallery-city-region">${group.regions.join(" / ")}</span>` : "";
    item.innerHTML = `<img src="${thumbnailSrc(coverPhoto.src)}" alt="${group.location}" width="260" height="260" loading="lazy" decoding="async"><span class="gallery-city-label"><span class="gallery-city-title">${group.location}</span>${regionText}</span><span class="gallery-city-meta"><span>${imageText} &middot; ${formatYearRange(group.years)}</span></span>`;
    item.addEventListener("click", () => openLightbox(lightboxIndexes.indexOf(group.indexes[0]), lightboxIndexes));
    galleryGrid.appendChild(item);
    tuneLocationOverlay(item, item.querySelector("img"));
  });
  updateLocationButton(locationGroups.length);
}

function renderTimeGallery() {
  galleryGrid.innerHTML = "";
  renderedGalleryCount = 0;
  appendGalleryItems();
}

function setGalleryView(view) {
  activeGalleryView = view;
  galleryViewButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.galleryView === activeGalleryView);
  });
  if (activeGalleryView === "location") {
    visibleLocationCount = initialGalleryItemCount();
    renderLocationGallery();
  } else {
    renderTimeGallery();
  }
}

galleryShowMore.addEventListener("click", () => {
  visibleGalleryCount = Math.min(visibleGalleryCount + galleryBatchSize, galleryPhotos.length);
  appendGalleryItems();
});
galleryShowAll.addEventListener("click", () => {
  visibleGalleryCount = galleryPhotos.length;
  appendGalleryItems();
});
galleryShowAllLocations.addEventListener("click", () => {
  visibleLocationCount = galleryLocationGroups().length;
  renderLocationGallery();
});
galleryViewButtons.forEach(button => {
  button.addEventListener("click", () => setGalleryView(button.dataset.galleryView));
});
setGalleryView("location");

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightboxByArrow(-1, lightboxPrev));
lightboxNext.addEventListener("click", () => moveLightboxByArrow(1, lightboxNext));
lightbox.addEventListener("click", handleLightboxClick);
lightbox.addEventListener("mousemove", updateLightboxNavHint);
lightbox.addEventListener("mouseleave", clearLightboxNavHint);
lightboxImg.addEventListener("touchstart", startLightboxSwipe, { passive: true });
lightboxImg.addEventListener("touchend", finishLightboxSwipe, { passive: false });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("active")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

function loadVisitorMap() {
  const mount = document.getElementById("visitorMapMount");
  if (!mount) return;

  const fallback = mount.querySelector(".visitor-map-fallback");
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "mapmyvisitors";
  script.async = true;
  script.src = "https://mapmyvisitors.com/map.js?cl=4c778e&w=a&t=tt&d=JaY55H1cvUyEKvmJh_8DQoXBW_Owoc6JErSgoPA1uhg&co=fcfeff&ct=808080&cmo=3acc3a&cmn=ff5353";

  function showFallback() {
    if (!fallback) return;
    fallback.textContent = "Visitor map temporarily unavailable";
    fallback.style.display = "";
  }

  const observer = new MutationObserver(() => {
    if (!mount.querySelector("#mapmyvisitors-widget")) return;
    if (fallback) fallback.style.display = "none";
    observer.disconnect();
  });
  observer.observe(mount, { childList: true, subtree: true });

  script.addEventListener("error", () => {
    observer.disconnect();
    showFallback();
  });
  mount.appendChild(script);

  window.setTimeout(() => {
    observer.disconnect();
    if (!mount.querySelector("#mapmyvisitors-widget")) showFallback();
  }, 8000);
}

loadVisitorMap();
