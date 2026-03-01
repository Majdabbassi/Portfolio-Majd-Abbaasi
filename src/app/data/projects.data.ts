export interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  status: 'production' | 'case-study' | 'experimental';
  role: string;
  techStack: string[];
  heroImage: string;
  backgroundImage?: string;

  context: {
    problem: string;
    constraints: string[];
    goals: string[];
  };

  architecture: {
    diagramPlaceholder: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
  };

  decisions: {
    title: string;
    reasoning: string;
    tradeoffs: string;
  }[];

  deployment: {
    isDeployed: boolean;
    flow?: string;
    environment?: string;
    details: string[];
    considerations?: string[];
  };

  challenges: {
    challenge: string;
    solution: string;
    outcome: string;
  }[];

  impact: {
    improvements: string[];
    learnings: string[];
    wouldRefactor: string[];
  };
}

export const PROJECTS: ProjectDetail[] = [
  {
    id: 'distributed-ecommerce',
    title: 'Distributed E-Commerce Platform',
    summary:
      'Scalable backend system handling authenticated multi-role access with milligram-level inventory tracking.',
    status: 'production',
    role: 'Full Stack Engineer',
    techStack: ['Spring Boot', 'Angular', 'Docker', 'PostgreSQL', 'Redis'],
    heroImage: 'assets/majd.jpeg',
    backgroundImage: 'assets/majd.jpeg',
    context: {
      problem:
        'Traditional monolithic e-commerce platforms struggle with concurrent inventory operations and multi-role access control. The existing system experienced race conditions during high-traffic periods, leading to overselling and inconsistent state.',
      constraints: [
        'Must support concurrent users without data loss',
        'Sub-200ms response time for inventory queries',
        'Role-based access for admin, vendor, and customer roles',
        'Containerized deployment for environment parity',
      ],
      goals: [
        'Build a distributed backend that handles concurrent writes safely',
        'Implement granular role-based access control',
        'Achieve consistent sub-200ms API response times',
        'Create a reproducible deployment pipeline with Docker',
      ],
    },
    architecture: {
      diagramPlaceholder: 'E-Commerce System Architecture',
      bullets: [
        'Service-oriented backend with Spring Boot handling business logic',
        'Angular SPA consuming RESTful APIs with interceptor-based auth',
        'PostgreSQL with optimistic locking for inventory consistency',
        'Redis caching layer for frequently accessed product catalogs',
        'Docker Compose orchestrating all services in isolated networks',
      ],
      highlights: [
        {
          title: 'JWT Authentication',
          description: 'Stateless auth with refresh token rotation and Redis-backed revocation',
        },
        {
          title: 'Dockerized Services',
          description: 'Multi-stage builds reducing image size by 60%, isolated service networking',
        },
        {
          title: 'Optimistic Locking',
          description: 'Version-based concurrency control preventing inventory race conditions',
        },
      ],
    },
    decisions: [
      {
        title: 'PostgreSQL over MongoDB',
        reasoning:
          'E-commerce data is inherently relational — orders reference products, users reference roles. ACID compliance was non-negotiable for financial transactions.',
        tradeoffs:
          'Slightly more complex schema migrations, but gained transactional integrity and powerful JOIN operations for reporting.',
      },
      {
        title: 'Redis Caching Strategy',
        reasoning:
          'Product catalog reads outnumber writes 50:1. Redis reduced database load by caching frequently accessed data with TTL-based invalidation.',
        tradeoffs:
          'Added operational complexity of cache invalidation, but response times dropped from 180ms to 12ms for cached endpoints.',
      },
      {
        title: 'Optimistic over Pessimistic Locking',
        reasoning:
          'Pessimistic locking would create bottlenecks under concurrent load. Optimistic locking with version fields allows parallel reads while catching conflicts on write.',
        tradeoffs:
          'Occasional retry on conflict, but significantly better throughput under concurrent access patterns.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Git push → Jenkins pipeline → Build & test → Docker image → Registry → Docker Compose deployment',
      environment: 'Docker Compose on Linux VPS with Nginx reverse proxy',
      details: [
        'Multi-stage Docker builds for optimized production images',
        'Nginx reverse proxy with SSL termination',
        'Automated database migrations on deployment',
        'Health check endpoints for container orchestration',
        'Environment-specific configuration via Docker secrets',
      ],
    },
    challenges: [
      {
        challenge: 'Inventory race conditions under concurrent checkout',
        solution:
          'Implemented optimistic locking with version fields on inventory records. On conflict, the transaction retries with fresh data up to 3 times before failing gracefully.',
        outcome:
          'Zero overselling incidents during load testing with 200 concurrent checkout simulations.',
      },
      {
        challenge: 'Token refresh without interrupting user sessions',
        solution:
          'Built an Angular HTTP interceptor that detects 401 responses, queues pending requests, refreshes the token, and replays all queued requests transparently.',
        outcome:
          'Seamless user experience with no forced logouts during active sessions.',
      },
      {
        challenge: 'Slow product listing queries under growing data',
        solution:
          'Added Redis caching with intelligent invalidation — cache warms on startup and invalidates on product mutations using pub/sub events.',
        outcome:
          'Response times dropped from 180ms to 12ms for product catalog endpoints.',
      },
    ],
    impact: {
      improvements: [
        'API response times reduced by 93% for cached endpoints',
        'Zero data inconsistency incidents under concurrent load',
        'Deployment time reduced from 15 minutes to 3 minutes with Docker',
      ],
      learnings: [
        'Distributed caching requires careful invalidation strategy — TTL alone is insufficient',
        'Optimistic locking is superior for read-heavy workloads but needs retry logic',
        'Docker multi-stage builds significantly impact CI/CD pipeline speed',
      ],
      wouldRefactor: [
        'Extract inventory service into its own microservice for independent scaling',
        'Replace polling-based cache invalidation with event-driven approach using Kafka',
        'Add comprehensive integration tests for the token refresh flow',
      ],
    },
  },
  {
    id: 'monitoring-system',
    title: 'Monitoring-Driven API Architecture',
    summary:
      'Containerized microservice ecosystem with full observability stack and automated alerting pipelines.',
    status: 'case-study',
    role: 'Backend & DevOps Engineer',
    techStack: ['Prometheus', 'Grafana', 'Spring Boot', 'Docker', 'Actuator'],
    heroImage: 'favicon.ico',
    backgroundImage: 'favicon.ico',
    context: {
      problem:
        'Microservices without observability operate as black boxes. Teams were debugging production issues through log files and user reports, with average incident detection time exceeding 30 minutes.',
      constraints: [
        'Minimal performance overhead from monitoring instrumentation',
        'Must work with existing Spring Boot services without major refactoring',
        'Alerting pipeline must integrate with team communication tools',
        'Dashboard must provide both high-level overview and drill-down capability',
      ],
      goals: [
        'Achieve sub-60-second incident detection through automated alerting',
        'Build comprehensive service health dashboards',
        'Implement distributed tracing across service boundaries',
        'Create self-documenting monitoring that serves as system documentation',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Observability Stack Architecture',
      bullets: [
        'Spring Boot Actuator exposing /metrics endpoints in Prometheus format',
        'Prometheus server scraping metrics at 15-second intervals',
        'Grafana dashboards with pre-built panels for JVM, HTTP, and custom business metrics',
        'AlertManager routing critical alerts based on severity and service ownership',
        'Docker Compose binding the entire observability stack with the application services',
      ],
      highlights: [
        {
          title: 'Custom Business Metrics',
          description:
            'Application-level counters and histograms tracking domain events beyond infrastructure',
        },
        {
          title: 'Alert Routing',
          description:
            'Severity-based routing with escalation policies and silence windows for maintenance',
        },
        {
          title: 'Dashboard as Documentation',
          description:
            'Grafana dashboards serving as living documentation of system behavior and SLOs',
        },
      ],
    },
    decisions: [
      {
        title: 'Prometheus over ELK for Metrics',
        reasoning:
          'Prometheus is purpose-built for time-series metrics with a powerful query language (PromQL). ELK is better suited for log aggregation, not real-time metric alerting.',
        tradeoffs:
          'Lost full-text log search capability, but gained precise metric alerting with lower resource consumption.',
      },
      {
        title: 'Pull-based over Push-based Metrics',
        reasoning:
          'Prometheus pull model simplifies service configuration — services just expose an endpoint. No need for services to know about the monitoring infrastructure.',
        tradeoffs:
          'Requires service discovery configuration, but services remain decoupled from monitoring concerns.',
      },
      {
        title: 'Histogram over Summary for Latency',
        reasoning:
          'Histograms allow server-side quantile calculation and aggregation across instances. Summaries compute quantiles client-side and cannot be meaningfully aggregated.',
        tradeoffs:
          'Slightly higher storage cost per metric, but gained accurate cross-instance percentile calculations.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Prometheus federation for multi-cluster monitoring',
        'Thanos or Cortex for long-term metric storage',
        'Grafana provisioning via Infrastructure as Code',
        'Network policies restricting metric endpoint access',
        'Horizontal scaling of Prometheus with sharding',
      ],
    },
    challenges: [
      {
        challenge: 'High cardinality labels causing Prometheus memory issues',
        solution:
          'Audited all custom metrics and removed user-ID-level labels. Introduced relabeling rules in Prometheus config to drop high-cardinality series before ingestion.',
        outcome:
          'Prometheus memory usage reduced by 40%, query performance improved significantly.',
      },
      {
        challenge: 'Alert fatigue from noisy threshold-based alerts',
        solution:
          'Replaced static thresholds with rate-of-change alerts and added grouping with inhibition rules in AlertManager to suppress downstream alerts.',
        outcome:
          'Alert volume reduced by 70% while maintaining detection of genuine incidents.',
      },
      {
        challenge: 'Grafana dashboard sprawl with inconsistent panels',
        solution:
          'Created a standardized dashboard template with required panels (golden signals) and used Grafana provisioning to enforce consistency across services.',
        outcome:
          'Onboarding time for new services reduced from hours to minutes with template-based dashboards.',
      },
    ],
    impact: {
      improvements: [
        'Incident detection time reduced from 30+ minutes to under 60 seconds',
        'Alert noise reduced by 70% through intelligent grouping and routing',
        'New service onboarding with full monitoring in under 10 minutes',
      ],
      learnings: [
        'Observability is not just monitoring — it requires intentional instrumentation design',
        'High cardinality is the silent killer of Prometheus performance',
        'Dashboards should tell a story, not just display numbers',
      ],
      wouldRefactor: [
        'Add distributed tracing with Jaeger for cross-service request flows',
        'Implement SLO-based alerting instead of threshold-based',
        'Migrate to OpenTelemetry for vendor-neutral instrumentation',
      ],
    },
  },
  {
    id: 'cicd-pipeline',
    title: 'Automated CI/CD Infrastructure',
    summary:
      'Zero-downtime deployment pipeline integrating testing, security scanning, and container registry.',
    status: 'production',
    role: 'DevOps Engineer',
    techStack: ['Jenkins', 'Docker', 'SonarQube', 'Nginx', 'Shell Scripting'],
    heroImage: 'assets/projects/cicd-bg.jpg',
    backgroundImage: 'assets/projects/cicd-bg.jpg',
    context: {
      problem:
        'Manual deployments were error-prone, time-consuming, and lacked consistency. Code quality varied across team members, and security vulnerabilities were discovered late in the development cycle.',
      constraints: [
        'Must support multiple application types (Java, Angular)',
        'Pipeline must complete in under 10 minutes for fast feedback',
        'Security scanning cannot be bypassed or skipped',
        'Zero-downtime requirement for production deployments',
      ],
      goals: [
        'Automate the entire path from commit to production',
        'Integrate code quality gates that prevent bad code from shipping',
        'Add security scanning as a mandatory pipeline stage',
        'Achieve zero-downtime deployments through blue-green strategy',
      ],
    },
    architecture: {
      diagramPlaceholder: 'CI/CD Pipeline Architecture',
      bullets: [
        'Jenkins declarative pipeline with parallel stage execution',
        'SonarQube quality gates enforcing coverage and code smell thresholds',
        'Docker-based build agents for reproducible build environments',
        'Private Docker registry for versioned image storage',
        'Nginx reverse proxy with blue-green deployment switching',
      ],
      highlights: [
        {
          title: 'Quality Gates',
          description:
            'SonarQube enforcing minimum 80% coverage and zero critical vulnerabilities',
        },
        {
          title: 'Blue-Green Deploys',
          description:
            'Nginx upstream switching for zero-downtime production releases',
        },
        {
          title: 'Pipeline as Code',
          description:
            'Jenkinsfile versioned alongside application code for full traceability',
        },
      ],
    },
    decisions: [
      {
        title: 'Jenkins over GitHub Actions',
        reasoning:
          'Self-hosted Jenkins provides full control over build agents, plugin ecosystem, and pipeline customization. GitHub Actions at the time had limited support for complex multi-stage pipelines.',
        tradeoffs:
          'Higher operational overhead for Jenkins maintenance, but gained complete control over the CI/CD infrastructure.',
      },
      {
        title: 'Blue-Green over Rolling Deployment',
        reasoning:
          'Blue-green provides instant rollback capability — just switch the Nginx upstream. Rolling deployments can leave the system in a mixed state during updates.',
        tradeoffs:
          'Requires double the infrastructure during deployment window, but rollback is instantaneous.',
      },
      {
        title: 'SonarQube Quality Gates as Hard Blocks',
        reasoning:
          'Making quality gates advisory only means they get ignored. Hard blocks ensure code quality standards are maintained consistently.',
        tradeoffs:
          'Occasionally blocks urgent fixes that need quick review, but overall code quality improved dramatically.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Git push → Webhook → Jenkins → Build → Test → SonarQube → Docker Build → Registry → Blue-Green Deploy',
      environment: 'Self-hosted Jenkins on Linux VPS, private Docker registry',
      details: [
        'Declarative Jenkinsfile with shared library for common stages',
        'Parallel test execution reducing pipeline time by 40%',
        'Automated rollback on health check failure post-deployment',
        'Slack notifications for pipeline status and quality gate results',
        'Credential management via Jenkins secrets with rotation policy',
      ],
    },
    challenges: [
      {
        challenge: 'Pipeline execution time exceeding 15 minutes',
        solution:
          'Parallelized independent stages (lint, unit tests, integration tests), implemented Docker layer caching, and used build agents with warm caches.',
        outcome: 'Pipeline time reduced from 15 minutes to 6 minutes.',
      },
      {
        challenge: 'Flaky integration tests causing false pipeline failures',
        solution:
          'Isolated integration test environment with dedicated containers, added retry logic for infrastructure-dependent tests, and implemented test result trending.',
        outcome:
          'False failure rate dropped from 15% to under 2%, restoring team confidence in the pipeline.',
      },
      {
        challenge: 'Zero-downtime deployment with database schema changes',
        solution:
          'Adopted expand-and-contract migration pattern — schema changes are deployed as backward-compatible additions first, then old columns are removed in a subsequent release.',
        outcome:
          'Successfully deployed 20+ schema migrations with zero-downtime in production.',
      },
    ],
    impact: {
      improvements: [
        'Deployment frequency increased from weekly to multiple times per day',
        'Production incidents from deployment errors reduced by 90%',
        'Code quality metrics improved across all projects using the pipeline',
      ],
      learnings: [
        'Pipeline-as-code is essential for reproducibility and team collaboration',
        'Security scanning should be a first-class citizen, not an afterthought',
        'Invest in pipeline speed — slow pipelines kill developer productivity',
      ],
      wouldRefactor: [
        'Migrate to container-native CI like Tekton for better Kubernetes integration',
        'Add canary deployments for gradual traffic shifting',
        'Implement pipeline metrics dashboard for tracking CI/CD health',
      ],
    },
  },
  {
    id: 'secure-auth-system',
    title: 'Secure Multi-Service Architecture',
    summary:
      'Centralized identity management implementing RBAC, JWT revocation, and secure session handling.',
    status: 'experimental',
    role: 'Backend Engineer',
    techStack: ['Spring Security', 'JWT', 'Oauth2', 'Angular', 'Redis'],
    heroImage: 'assets/projects/auth-bg.jpg',
    backgroundImage: 'assets/projects/auth-bg.jpg',
    context: {
      problem:
        'Each microservice implemented its own authentication, leading to inconsistent security policies, duplicated code, and no centralized session management. Token revocation was impossible across services.',
      constraints: [
        'Must support multiple authentication providers (local, OAuth2)',
        'Token revocation must propagate within 5 seconds across all services',
        'Must handle role hierarchy (admin > moderator > user)',
        'Backward compatible with existing service authentication',
      ],
      goals: [
        'Centralize authentication into a single identity service',
        'Implement fine-grained RBAC with role hierarchy',
        'Enable instant token revocation across the service mesh',
        'Support OAuth2 integration for third-party authentication',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Authentication System Architecture',
      bullets: [
        'Centralized Identity Service issuing and validating JWTs',
        'Redis-backed token blacklist for instant revocation across services',
        'Spring Security filter chain with custom authentication providers',
        'OAuth2 integration supporting Google and GitHub providers',
        'Angular guards and interceptors for client-side route protection',
      ],
      highlights: [
        {
          title: 'Token Revocation',
          description:
            'Redis-backed blacklist with pub/sub propagation ensuring sub-5-second revocation',
        },
        {
          title: 'Role Hierarchy',
          description:
            'Configurable role hierarchy supporting inheritance and permission composition',
        },
        {
          title: 'Refresh Token Rotation',
          description:
            'One-time-use refresh tokens preventing replay attacks with automatic rotation',
        },
      ],
    },
    decisions: [
      {
        title: 'JWT over Opaque Tokens',
        reasoning:
          'JWTs enable stateless validation at each service without calling the identity service for every request. This reduces latency and eliminates a single point of failure.',
        tradeoffs:
          'Revocation requires an external blacklist (Redis), but the performance benefit of stateless validation outweighs the complexity.',
      },
      {
        title: 'Redis Pub/Sub for Revocation',
        reasoning:
          'When a token is revoked, all services need to know immediately. Redis pub/sub pushes revocation events to all subscribed services within milliseconds.',
        tradeoffs:
          'Added dependency on Redis availability, but mitigated with Redis Sentinel for high availability.',
      },
      {
        title: 'Custom Spring Security Filters',
        reasoning:
          'Default Spring Security configuration is designed for monoliths. Custom filters allow microservice-specific authentication logic while sharing the core validation layer.',
        tradeoffs:
          'Higher implementation complexity, but gained full control over the authentication flow per service.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Deploy identity service with horizontal scaling behind load balancer',
        'Redis Sentinel or Cluster for high-availability token store',
        'Rate limiting on authentication endpoints to prevent brute-force attacks',
        'Mutual TLS between services for zero-trust networking',
        'Secret rotation automation for JWT signing keys',
      ],
    },
    challenges: [
      {
        challenge: 'Token revocation latency across distributed services',
        solution:
          'Implemented Redis pub/sub where the identity service publishes revocation events and all services subscribe. Local cache TTL of 5 seconds ensures eventual consistency.',
        outcome:
          'Token revocation propagates to all services within 3 seconds on average.',
      },
      {
        challenge: 'OAuth2 state management across redirects',
        solution:
          'Used encrypted state parameter with PKCE flow, storing OAuth2 session state in Redis with short TTL to prevent CSRF and replay attacks.',
        outcome:
          'Secure OAuth2 flow with zero reported authentication bypass attempts during testing.',
      },
      {
        challenge: 'Role hierarchy evaluation performance',
        solution:
          'Pre-computed role hierarchy into a flattened permission set cached per user session. Hierarchy changes trigger cache invalidation through events.',
        outcome:
          'Permission checks execute in O(1) time regardless of role hierarchy depth.',
      },
    ],
    impact: {
      improvements: [
        'Eliminated duplicated authentication code across 5 services',
        'Token revocation time reduced from "impossible" to under 3 seconds',
        'OAuth2 integration enabled third-party login with zero additional service changes',
      ],
      learnings: [
        'Centralized auth is critical for microservice security consistency',
        'Stateless tokens need a stateful revocation mechanism — they are not truly stateless',
        'PKCE is essential for all OAuth2 flows, including server-side',
      ],
      wouldRefactor: [
        'Adopt OpenID Connect for standardized identity claims',
        'Implement mutual TLS for service-to-service authentication',
        'Add comprehensive audit logging for all authentication events',
      ],
    },
  },
  {
    id: 'real-time-analytics',
    title: 'Real-Time Data Analytics Engine',
    summary:
      'High-throughput stream processing system analyzing user behavior patterns with sub-second latency.',
    status: 'case-study',
    role: 'Backend Engineer',
    techStack: ['Apache Kafka', 'Spring Boot', 'Elasticsearch', 'WebSockets'],
    heroImage: 'assets/projects/analytics-bg.jpg',
    backgroundImage: 'assets/projects/analytics-bg.jpg',
    context: {
      problem:
        'Batch-processed analytics had a 24-hour delay, making real-time decision making impossible. Marketing and product teams needed live dashboards showing user behavior as it happened.',
      constraints: [
        'Must handle 10,000+ events per second during peak traffic',
        'End-to-end latency from event to dashboard must be under 2 seconds',
        'Historical data must remain queryable alongside real-time data',
        'System must gracefully handle traffic spikes without data loss',
      ],
      goals: [
        'Build a real-time event processing pipeline with sub-second latency',
        'Create live dashboards with WebSocket-based data pushing',
        'Enable complex behavioral pattern detection in real-time',
        'Maintain full event history for retrospective analysis',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Stream Processing Architecture',
      bullets: [
        'Kafka topics partitioned by event type for parallel processing',
        'Spring Boot consumers processing events with exactly-once semantics',
        'Elasticsearch indexing processed events for fast aggregation queries',
        'WebSocket server pushing aggregated metrics to connected dashboards',
        'Dead letter queue for failed event processing with automatic retry',
      ],
      highlights: [
        {
          title: 'Exactly-Once Processing',
          description:
            'Kafka transactions with idempotent consumers ensuring no duplicate event processing',
        },
        {
          title: 'Backpressure Handling',
          description:
            'Consumer group scaling and partition rebalancing under load spikes',
        },
        {
          title: 'Live Dashboards',
          description:
            'WebSocket connections pushing aggregated metrics with 500ms refresh intervals',
        },
      ],
    },
    decisions: [
      {
        title: 'Kafka over RabbitMQ',
        reasoning:
          'Kafka provides durable, replayable event logs and handles high throughput with horizontal scaling. The analytics use case requires event replay for reprocessing and backfill scenarios.',
        tradeoffs:
          'Higher operational complexity than RabbitMQ, but gained event durability, replay capability, and superior throughput.',
      },
      {
        title: 'Elasticsearch over PostgreSQL for Analytics',
        reasoning:
          'Analytics queries require fast aggregations across millions of documents. Elasticsearch near-real-time indexing and aggregation framework is purpose-built for this workload.',
        tradeoffs:
          'Less strict consistency guarantees than PostgreSQL, but the analytics domain tolerates eventual consistency.',
      },
      {
        title: 'WebSockets over SSE for Live Updates',
        reasoning:
          'WebSockets provide bidirectional communication, allowing dashboards to request specific metric subscriptions and filter updates. SSE is limited to server-push only.',
        tradeoffs:
          'More complex connection management and reconnection logic, but gained interactive dashboard capabilities.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Kafka cluster with 3+ brokers for fault tolerance',
        'Elasticsearch cluster with dedicated master and data nodes',
        'Consumer group scaling based on partition lag metrics',
        'Schema registry for event schema evolution management',
        'Cold-warm-hot architecture for cost-effective data retention',
      ],
    },
    challenges: [
      {
        challenge: 'Consumer lag spike during traffic peaks',
        solution:
          'Implemented auto-scaling consumer groups based on lag metrics. Pre-allocated partitions with headroom for burst handling. Added backpressure signaling to producers.',
        outcome:
          'System handles 3x normal traffic without consumer lag exceeding 5 seconds.',
      },
      {
        challenge: 'Elasticsearch index performance degradation over time',
        solution:
          'Implemented time-based index rollover with ILM (Index Lifecycle Management). Hot indices use SSD storage, warm indices compress and move to cheaper storage.',
        outcome:
          'Query performance remains consistent regardless of data volume growth.',
      },
      {
        challenge: 'WebSocket connection drops under load',
        solution:
          'Implemented connection pooling with automatic reconnection, exponential backoff, and subscription state restoration. Added heartbeat mechanism for connection health monitoring.',
        outcome:
          'Dashboard uptime improved to 99.9% with seamless reconnection after network interruptions.',
      },
    ],
    impact: {
      improvements: [
        'Analytics latency reduced from 24 hours to under 2 seconds',
        'Marketing team gained ability to react to trends in real-time',
        'Event processing throughput handles 15,000 events/second sustained',
      ],
      learnings: [
        'Exactly-once semantics in distributed systems requires careful transaction boundary design',
        'Elasticsearch ILM is essential for production — unmanaged indices are a ticking time bomb',
        'WebSocket reliability requires significant investment in reconnection and state management',
      ],
      wouldRefactor: [
        'Adopt Apache Flink for complex event processing and windowed aggregations',
        'Implement schema registry for event contract management',
        'Add data quality monitoring to detect event schema drift',
      ],
    },
  },
  {
    id: 'cloud-infrastructure',
    title: 'Hybrid Cloud Infrastructure',
    summary:
      'Multi-region deployment architecture ensuring high availability and disaster recovery compliance.',
    status: 'production',
    role: 'DevOps & Infrastructure Engineer',
    techStack: ['AWS', 'Terraform', 'Kubernetes', 'Ansible'],
    heroImage: 'assets/projects/cloud-bg.jpg',
    backgroundImage: 'assets/projects/cloud-bg.jpg',
    context: {
      problem:
        'Single-region deployment meant any regional outage caused complete service unavailability. Manual infrastructure provisioning led to configuration drift and inconsistent environments across staging and production.',
      constraints: [
        '99.95% uptime SLA requirement',
        'Data residency compliance for EU and US regions',
        'Infrastructure changes must be auditable and reversible',
        'Cost optimization while maintaining redundancy',
      ],
      goals: [
        'Achieve multi-region high availability with automatic failover',
        'Implement Infrastructure as Code for all environments',
        'Create disaster recovery procedures with tested runbooks',
        'Optimize cloud costs while maintaining SLA commitments',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Cloud Infrastructure Architecture',
      bullets: [
        'Terraform modules managing AWS infrastructure across multiple regions',
        'Kubernetes clusters with pod anti-affinity for high availability',
        'Ansible playbooks for configuration management and secret rotation',
        'Route 53 health checks with DNS failover between regions',
        'S3 cross-region replication for static assets and backups',
      ],
      highlights: [
        {
          title: 'Infrastructure as Code',
          description:
            'Every resource defined in Terraform with state locking and plan review workflow',
        },
        {
          title: 'Auto-Scaling',
          description:
            'Kubernetes HPA and cluster autoscaler responding to load in under 90 seconds',
        },
        {
          title: 'Disaster Recovery',
          description:
            'RTO of 15 minutes and RPO of 5 minutes with automated failover procedures',
        },
      ],
    },
    decisions: [
      {
        title: 'Terraform over CloudFormation',
        reasoning:
          'Terraform supports multi-cloud and has a richer module ecosystem. Even in an AWS-only environment, Terraform state management and plan/apply workflow is superior.',
        tradeoffs:
          'Need to manage Terraform state externally (S3 + DynamoDB), but gained provider-agnostic infrastructure definition.',
      },
      {
        title: 'Kubernetes over ECS',
        reasoning:
          'Kubernetes provides greater portability and avoids deep AWS vendor lock-in. The ecosystem of tools (Helm, Kustomize, operators) is significantly larger.',
        tradeoffs:
          'Higher operational complexity than ECS, but gained portability and a richer ecosystem for workload management.',
      },
      {
        title: 'Multi-Region Active-Passive over Active-Active',
        reasoning:
          'Active-active requires solving distributed data consistency, which adds significant complexity. Active-passive with fast failover meets the 99.95% SLA at lower cost.',
        tradeoffs:
          'Passive region resources are partially idle, but avoided the complexity of multi-region write conflicts.',
      },
    ],
    deployment: {
      isDeployed: true,
      flow: 'Terraform plan → PR review → Terraform apply → Ansible configure → Kubernetes deploy → Health check',
      environment: 'AWS multi-region (us-east-1, eu-west-1) with Kubernetes clusters',
      details: [
        'GitOps workflow with Terraform plans auto-generated on PR',
        'Kubernetes manifests managed through Helm charts',
        'Automated certificate rotation with cert-manager',
        'Cost monitoring with AWS Cost Explorer and custom budgets',
        'Monthly disaster recovery drills with documented runbooks',
      ],
    },
    challenges: [
      {
        challenge: 'Terraform state conflicts during concurrent team changes',
        solution:
          'Implemented remote state with S3 backend and DynamoDB locking. Established team workflow requiring state lock acquisition before any infrastructure changes.',
        outcome:
          'Zero state corruption incidents since implementing structured locking workflow.',
      },
      {
        challenge: 'Cross-region data replication latency',
        solution:
          'Implemented asynchronous replication with conflict resolution policies. Read-heavy endpoints route to nearest region via Route 53 latency-based routing.',
        outcome:
          'Users experience < 50ms latency regardless of region, with replication lag under 30 seconds.',
      },
      {
        challenge: 'Kubernetes pod scheduling during node scaling',
        solution:
          'Configured pod disruption budgets, topology spread constraints, and pre-emptive node scaling based on scheduled traffic patterns (predictive scaling).',
        outcome:
          'Zero service disruptions during scaling events, with nodes ready before traffic peaks.',
      },
    ],
    impact: {
      improvements: [
        'Achieved 99.97% uptime exceeding the 99.95% SLA target',
        'Infrastructure provisioning time reduced from days to 30 minutes',
        'Cloud costs reduced 25% through right-sizing and reserved instances',
      ],
      learnings: [
        'Infrastructure as Code discipline requires the same rigor as application code review',
        'Disaster recovery plans are worthless without regular testing',
        'Cost optimization is an ongoing process, not a one-time activity',
      ],
      wouldRefactor: [
        'Implement Crossplane for Kubernetes-native infrastructure management',
        'Add Argo CD for full GitOps deployment workflow',
        'Implement FinOps practices with automated resource tagging and cost allocation',
      ],
    },
  },
];
