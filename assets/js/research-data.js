window.researchPaperData = {
  "code-harness": {
    title: "Code as Agent Harness",
    venue: "arXiv 2026",
    topics: ["Agent Harnesses", "Tool Use", "Context Engineering"],
    insights: {
      "agent-harnesses": "Code is more than an action format: it gives agents compositional tools, persistent state, and verifiable execution.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2605.18747", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/YennNing/Awesome-Code-as-Agent-Harness-Papers", icon: "fab fa-github" },
      { label: "Project", url: "https://code-as-harness.github.io/code-as-harness-webpage/", icon: "fas fa-globe" },
    ],
  },
  recontext: {
    title: "ReContext: Recursive Evidence Replay as LLM Harness for Long-Context Reasoning",
    venue: "arXiv 2026",
    topics: ["Long-Context Reasoning", "Agent Harnesses", "Evidence Replay"],
    insights: {
      "agent-harnesses": "A lightweight replay loop can improve reasoning without retraining or expanding the base model.",
      "agentic-reasoning": "Reasoning improves when the agent decides what evidence to revisit instead of reading the context only once.",
      "context-grounding": "Recursive replay turns long-context grounding into an iterative evidence-seeking process.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2607.02509", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/Yanjun-Zhao/ReContext", icon: "fab fa-github" },
    ],
  },
  "agentic-reasoning": {
    title: "Agentic Reasoning for Large Language Models",
    venue: "arXiv 2026",
    topics: ["Agentic Reasoning", "Planning", "Self-Improvement"],
    insights: {
      "agentic-reasoning": "Agentic reasoning couples deliberate planning with tools, memory, and feedback rather than a single static chain.",
      "self-improving-agents": "Self-improvement emerges from feedback loops over plans, memory, tools, and multi-agent interaction.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2601.12538", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/weitianxin/Awesome-Agentic-Reasoning", icon: "fab fa-github" },
      { label: "Hugging Face", url: "https://huggingface.co/papers/2601.12538", icon: "fas fa-file-alt" },
    ],
  },
  "mem-gallery": {
    title: "Mem-Gallery: Benchmarking Multimodal Long-Term Conversational Memory for MLLM Agents",
    venue: "ACL 2026",
    topics: ["MLLM Agents", "Long-Term Memory", "Benchmarking"],
    insights: {
      "self-improving-agents": "Persistent multimodal memory is a prerequisite for agents that learn from their interaction histories.",
      "context-grounding": "Long context alone does not guarantee reliable long-term conversational memory.",
      "reasoning-reliability": "Reliable multimodal agents must retrieve the right historical visual and textual evidence, not merely store it.",
    },
    links: [
      { label: "PDF", url: "https://aclanthology.org/2026.acl-long.1892.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/YuanchenBei/Mem-Gallery", icon: "fab fa-github" },
      { label: "Dataset", url: "https://huggingface.co/datasets/Ethan-Bei/Mem-Gallery", icon: "fas fa-database" },
    ],
  },
  selfelicit: {
    title: "SelfElicit: Your Language Model Secretly Knows Where Is the Relevant Evidence",
    venue: "ACL 2025",
    topics: ["Long-Context QA", "Evidence Grounding", "Interpretability"],
    insights: {
      "context-grounding": "A model's own internal signals can identify relevant evidence that standard long-context processing overlooks.",
      "reasoning-reliability": "Evidence-aware inference separates what a model sees from what it actually uses to answer.",
    },
    links: [
      { label: "PDF", url: "https://aclanthology.org/2025.acl-long.448.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/SelfElicit", icon: "fab fa-github" },
    ],
  },
  "seeing-not-believing": {
    title: "Seeing but Not Believing: Probing the Disconnect between Visual Attention and Answer Correctness in VLMs",
    venue: "ICLR 2026",
    topics: ["VLM Reliability", "Visual Grounding", "Attention"],
    insights: {
      "reasoning-reliability": "Visual attention can look plausible while the answer is wrong, so attention alone is not a reliable grounding signal.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2510.17771", icon: "fas fa-file-pdf" },
    ],
  },
  "moral-backbone": {
    title: "Do VLMs Have a Moral Backbone? A Study on the Fragile Morality of Vision-Language Models",
    venue: "ACL 2026",
    topics: ["VLM Alignment", "Moral Reasoning", "Robustness"],
    insights: {
      "fairness-alignment": "VLM moral judgments can shift under superficial context changes, revealing brittle alignment.",
    },
    links: [
      { label: "PDF", url: "https://aclanthology.org/2026.findings-acl.2079.pdf", icon: "fas fa-file-pdf" },
    ],
  },
  "reward-diversity": {
    title: "Not All Voices Are Rewarded Equally: Probing and Repairing Reward Models across Human Diversity",
    venue: "EMNLP 2025",
    topics: ["Reward Models", "Human Diversity", "Fairness"],
    insights: {
      "fairness-alignment": "Aggregate reward quality can hide systematic preference gaps across demographic and value groups.",
    },
    links: [
      { label: "PDF", url: "https://aclanthology.org/2025.findings-emnlp.183.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/Violet24K/FaRM", icon: "fab fa-github" },
    ],
  },
  aim: {
    title: "AIM: Attributing, Interpreting, Mitigating Data Unfairness",
    venue: "KDD 2024",
    topics: ["Data Attribution", "Fairness", "Mitigation"],
    insights: {
      "fairness-alignment": "Fairness failures can be traced to influential samples, turning mitigation into a targeted data intervention.",
      "data-curation": "Sample-level attribution identifies which training data creates unfair outcomes and should be corrected.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2406.08819", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/AIM", icon: "fab fa-github" },
    ],
  },
  uadb: {
    title: "UADB: Unsupervised Anomaly Detection Booster",
    venue: "ICDE 2023",
    topics: ["Anomaly Detection", "Adaptive Learning", "Data Optimization"],
    insights: {
      "data-optimization": "Weak detector outputs become useful supervision when they are iteratively refined instead of treated as fixed labels.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2306.01997", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/HangtingYe/UADB", icon: "fab fa-github" },
    ],
  },
  mesa: {
    title: "MESA: Boost Ensemble Imbalanced Learning with Meta-Sampler",
    venue: "NeurIPS 2020",
    topics: ["Class Imbalance", "Meta-Sampling", "Ensembles"],
    insights: {
      "data-optimization": "Sampling should adapt to the current ensemble state instead of following a fixed balancing rule.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2010.08830", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/mesa", icon: "fab fa-github" },
    ],
  },
  climb: {
    title: "CLIMB: Class-Imbalanced Learning Benchmark on Tabular Data",
    venue: "NeurIPS 2025",
    topics: ["Class Imbalance", "Tabular Learning", "Benchmarking"],
    insights: {
      "data-curation": "Controlled data regimes reveal which imbalance patterns drive failures and where curation matters most.",
      "rare-case-generalization": "No imbalance method dominates every dataset, making data-regime-aware evaluation essential.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2505.17451", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/imbalanced-ensemble", icon: "fab fa-github" },
      { label: "Docs", url: "https://imbalanced-ensemble.readthedocs.io", icon: "fas fa-book" },
      { label: "PyPI", url: "https://pypi.org/project/imbalanced-ensemble/", icon: "fab fa-python" },
    ],
  },
  matcha: {
    title: "Matcha: Mitigating Graph Structure Shifts with Test-Time Adaptation",
    venue: "ICLR 2025",
    topics: ["Graph Learning", "Test-Time Adaptation", "Structure Shift"],
    insights: {
      "rare-case-generalization": "Test-time structural adaptation protects rare graph patterns without requiring target labels.",
      "graph-learning": "Graph robustness improves when adaptation explicitly targets structural shift at inference time.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2410.06976", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/baowenxuan/Matcha", icon: "fab fa-github" },
    ],
  },
  bat: {
    title: "Class-Imbalanced Graph Learning without Class Rebalancing",
    venue: "ICML 2024",
    topics: ["Graph Learning", "Class Imbalance", "Generalization"],
    insights: {
      "rare-case-generalization": "Minority classes can be improved without distorting graph structure through explicit class rebalancing.",
      "graph-learning": "Handling imbalance within graph learning avoids the structural side effects of resampling nodes.",
    },
    links: [
      { label: "PDF", url: "https://raw.githubusercontent.com/mlresearch/v235/main/assets/liu24ay/liu24ay.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/BAT", icon: "fab fa-github" },
    ],
  },
  adafuse: {
    title: "AdaFuse: Adaptive Ensemble Decoding for Large Language Models",
    venue: "ACL 2026",
    topics: ["LLM Ensembles", "Adaptive Decoding", "Model Fusion"],
    insights: {
      "model-fusion": "The best model varies across inputs and decoding steps, so adaptive fusion outperforms a fixed ensemble.",
    },
    links: [
      { label: "PDF", url: "https://aclanthology.org/2026.acl-long.1974.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/CCM0111/AdaFuse", icon: "fab fa-github" },
    ],
  },
  remix: {
    title: "ReMix: Reinforcement Routing for Mixtures of LoRAs in LLM Finetuning",
    venue: "LLA 2026",
    topics: ["LoRA Routing", "Reinforcement Learning", "Model Fusion"],
    insights: {
      "model-fusion": "Task feedback can route modular adapters more effectively than merging every specialist uniformly.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2603.10160", icon: "fas fa-file-pdf" },
    ],
  },
  timefuse: {
    title: "Breaking Silos: Adaptive Model Fusion Unlocks Better Time Series Forecasting",
    venue: "ICML 2025",
    topics: ["Time Series", "Forecasting", "Model Fusion"],
    insights: {
      "model-fusion": "Choosing and blending models per sample captures complementary strengths that static ensembles miss.",
      "time-series-analysis": "Different temporal samples favor different forecasters, making sample-level adaptation valuable.",
    },
    links: [
      { label: "PDF", url: "https://raw.githubusercontent.com/mlresearch/v267/main/assets/liu25cm/liu25cm.pdf", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/ZhiningLiu1998/TimeFuse", icon: "fab fa-github" },
    ],
  },
  "language-flow": {
    title: "Language in the Flow of Time: Time-Series-Paired Texts Weaved into a Unified Temporal Narrative",
    venue: "ICLR 2026",
    topics: ["Time Series", "Language Modeling", "Multimodal Learning"],
    insights: {
      "time-series-analysis": "A shared temporal narrative lets models reason jointly over numeric signals and linguistic context.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2502.08942", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/iDEA-iSAIL-Lab-UIUC/TaTS", icon: "fab fa-github" },
    ],
  },
  backtime: {
    title: "BACKTIME: Backdoor Attacks on Multivariate Time Series Forecasting",
    venue: "NeurIPS 2024",
    topics: ["Time Series", "Backdoor Attacks", "Forecasting"],
    insights: {
      "time-series-analysis": "A forecaster can retain clean accuracy yet fail under sparse temporal triggers, exposing a hidden reliability risk.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2410.02195", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/xiaolin-cs/BackTime", icon: "fab fa-github" },
    ],
  },
  planetalign: {
    title: "PlanetAlign: A Comprehensive Python Library for Benchmarking Network Alignment",
    venue: "ICLR 2026",
    topics: ["Network Alignment", "Graph Learning", "Benchmarking"],
    insights: {
      "graph-learning": "Standardized evaluation reveals how strongly alignment performance depends on graph conditions and protocol choices.",
    },
    links: [
      { label: "PDF", url: "https://arxiv.org/pdf/2505.21366", icon: "fas fa-file-pdf" },
      { label: "GitHub", url: "https://github.com/yq-leo/PlanetAlign", icon: "fab fa-github" },
      { label: "Docs", url: "https://planetalign.readthedocs.io/en/latest/", icon: "fas fa-book" },
    ],
  },
};
