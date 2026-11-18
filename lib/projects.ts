import type { Locale } from './config';
type Localized = { es: string; en: string };
type Decision = { title: Localized; body: Localized };
export type Project = {
  slug: string;
  name: string;
  number: string;
  category: Localized;
  subtitle: Localized;
  summary: Localized;
  problem: Localized;
  approach: Localized;
  scope: Localized;
  tech: string[];
  features: { es: string[]; en: string[] };
  architecture: string[];
  decisions: Decision[];
  results: { es: string[]; en: string[] };
  limits: Localized;
  demo: string;
  repo: string;
  docs: string;
  image: string;
  mobile: string;
  gallery: { src: string; alt: Localized; caption: Localized; ratio: string; layout?: 'mobile' }[];
  coverAlt?: Localized;
  verified?: Localized;
  social?: { src: string; width: number; height: number; alt: Localized };
  tone: 'green' | 'sand' | 'violet';
};
export const projects: Project[] = [
  {
    slug: 'businessos',
    name: 'BusinessOS',
    number: '01',
    category: { es: 'ERP SAAS · MULTI-TENANT', en: 'SAAS ERP · MULTI-TENANT' },
    subtitle: {
      es: 'La operación de un negocio, en un espacio conectado.',
      en: 'Business operations in one connected workspace.',
    },
    summary: {
      es: 'Un ERP que conecta clientes, inventario, ventas y facturación, con permisos y datos separados por organización.',
      en: 'An ERP connecting customers, inventory, sales and invoicing, with organization-scoped data and permissions.',
    },
    problem: {
      es: 'La información de clientes, productos y ventas necesita encajar en un mismo flujo. En una aplicación multi-tenant, cada operación debe respetar además el límite de la organización y el rol de quien la ejecuta.',
      en: 'Customer, product and sales data need to fit into a coherent workflow. In a multi-tenant application, every operation must also respect the organization boundary and the caller’s role.',
    },
    approach: {
      es: 'Separé la experiencia web en Next.js de una API NestJS que concentra autenticación, permisos y reglas de negocio. PostgreSQL y Prisma mantienen la persistencia; las operaciones de ventas coordinan pedidos, stock y facturas dentro de transacciones.',
      en: 'I separated the Next.js web experience from a NestJS API responsible for authentication, permissions and business rules. PostgreSQL and Prisma provide persistence; sales operations coordinate orders, stock and invoices within transactions.',
    },
    scope: {
      es: 'Interfaz, API, modelo de datos, autenticación y entrega.',
      en: 'Interface, API, data model, authentication and delivery.',
    },
    tech: [
      'Next.js',
      'React',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Playwright',
      'GitHub Actions',
    ],
    features: {
      es: [
        'Roles y aislamiento por organización',
        'Inventario y ventas transaccionales',
        'Facturas PDF y reportes demo',
      ],
      en: [
        'Roles and organization isolation',
        'Transactional inventory and sales',
        'Demo PDF invoices and reports',
      ],
    },
    architecture: ['Browser', 'Next.js', 'NestJS API', 'Prisma', 'PostgreSQL'],
    decisions: [
      {
        title: {
          es: 'El tenant se resuelve en el servidor',
          en: 'Resolve the tenant on the server',
        },
        body: {
          es: 'La API obtiene organización y rol desde la sesión y la membresía activa. Las consultas restringen tanto el recurso como la organización, sin confiar en un tenant enviado por el navegador.',
          en: 'The API resolves organization and role from the session and active membership. Queries constrain both the resource and organization rather than trusting a browser-supplied tenant.',
        },
      },
      {
        title: {
          es: 'Una venta es una operación coordinada',
          en: 'A sale is a coordinated operation',
        },
        body: {
          es: 'Totales calculados en servidor y transacciones relacionan pedidos, movimientos de inventario y facturas. Los ajustes condicionales evitan stock negativo y la numeración es única por organización.',
          en: 'Server-calculated totals and transactions connect orders, inventory movements and invoices. Conditional updates prevent negative stock and invoice numbering is unique within each organization.',
        },
      },
      {
        title: {
          es: 'Una demo pública con límites reales',
          en: 'A public demo with real boundaries',
        },
        body: {
          es: 'Explore demo ofrece una sesión de empleado de solo lectura. Los permisos se aplican en la API y la demo utiliza datos ficticios, sin exponer contraseñas administrativas.',
          en: 'Explore demo provides a read-only employee session. Permissions are enforced in the API, and the demo uses fictional data without exposing administrator passwords.',
        },
      },
    ],
    results: {
      es: [
        'Demo pública HTTPS con acceso de empleado de solo lectura.',
        'Panel y módulos que consultan PostgreSQL persistente.',
        'Código, arquitectura y comprobaciones automáticas visibles en GitHub.',
      ],
      en: [
        'Public HTTPS demo with read-only employee access.',
        'Dashboard and modules backed by persistent PostgreSQL.',
        'Source, architecture and automated checks available on GitHub.',
      ],
    },
    limits: {
      es: 'Es un proyecto de portfolio. Las organizaciones, personas, ventas e importes son ficticios. Las facturas PDF ilustran el flujo y no son documentos fiscales o contables. La demo pública no permite operaciones administrativas.',
      en: 'This is a portfolio project. Organizations, people, sales and amounts are fictional. PDF invoices illustrate the workflow and are not tax or accounting documents. The public demo does not permit administrative operations.',
    },
    demo: 'https://businessos-web-five.vercel.app',
    repo: 'https://github.com/cristoferdiazalvarez/businessos-erp',
    docs: 'https://github.com/cristoferdiazalvarez/businessos-erp/blob/main/docs/architecture.md',
    image: '/projects/businessos-dashboard.png',
    mobile: '/projects/businessos-mobile.png',
    tone: 'green',
    gallery: [
      {
        src: '/projects/businessos-dashboard.png',
        alt: {
          es: 'Panel real de BusinessOS con datos ficticios de Northstar Studio',
          en: 'Actual BusinessOS dashboard with fictional Northstar Studio data',
        },
        caption: {
          es: 'Panel conectado a datos persistentes de la organización demo.',
          en: 'Dashboard connected to persistent data in the demo organization.',
        },
        ratio: '1440 / 1000',
      },
      {
        src: '/projects/businessos-inventory.png',
        alt: {
          es: 'Módulo real de productos e inventario de BusinessOS',
          en: 'Actual BusinessOS products and inventory module',
        },
        caption: {
          es: 'Productos, disponibilidad y gestión de inventario.',
          en: 'Products, availability and inventory management.',
        },
        ratio: '1440 / 1000',
      },
    ],
  },
  {
    slug: 'atelier-commerce',
    name: 'Atelier Commerce',
    number: '02',
    category: { es: 'E-COMMERCE · EXPERIENCIA EDITORIAL', en: 'E-COMMERCE · EDITORIAL EXPERIENCE' },
    subtitle: {
      es: 'Una tienda cuidada, de la primera impresión al pedido.',
      en: 'A considered store, from first impression to order.',
    },
    summary: {
      es: 'Una experiencia de moda premium con catálogo, variantes, carrito persistente y checkout demo sobre inventario real.',
      en: 'A premium fashion experience with catalog, variants, a persistent bag and demo checkout backed by actual inventory.',
    },
    problem: {
      es: 'Una tienda necesita una experiencia coherente y una base de datos fiable. El precio, los descuentos y la disponibilidad no pueden depender de lo que envíe el navegador, especialmente cuando varias compras compiten por el mismo stock.',
      en: 'A store needs a coherent experience and reliable data. Prices, discounts and availability cannot depend on values sent by the browser, especially when purchases compete for the same stock.',
    },
    approach: {
      es: 'Construí un storefront editorial con Next.js y una capa de servidor que valida la compra con PostgreSQL y Prisma. El carrito y los favoritos se sincronizan por cuenta; el panel privado gestiona catálogo, inventario y pedidos con auditoría.',
      en: 'I built an editorial Next.js storefront with a server layer validating purchases through PostgreSQL and Prisma. The bag and favorites synchronize per account; a private back office manages the catalog, inventory and orders with an audit trail.',
    },
    scope: {
      es: 'Storefront, cuentas, checkout demo, inventario y administración.',
      en: 'Storefront, accounts, demo checkout, inventory and administration.',
    },
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Zustand',
      'Vitest',
      'Playwright',
    ],
    features: {
      es: [
        'Catálogo, variantes y favoritos persistentes',
        'Precios y stock validados en servidor',
        'Checkout sin cobro y administración privada',
      ],
      en: [
        'Catalog, variants and persistent favorites',
        'Server-validated prices and inventory',
        'Unpaid checkout and private administration',
      ],
    },
    architecture: ['Browser', 'Next.js server', 'Prisma', 'PostgreSQL'],
    decisions: [
      {
        title: { es: 'Reservar stock sin sobreventa', en: 'Reserve stock without overselling' },
        body: {
          es: 'La reserva valida variantes y descuenta stock de forma condicional en una transacción serializable. Las claves de idempotencia evitan duplicar pedidos al repetir una petición.',
          en: 'Reservations validate variants and conditionally decrement inventory in a serializable transaction. Idempotency keys prevent duplicate orders when requests are retried.',
        },
      },
      {
        title: { es: 'La cuenta es un límite de datos', en: 'The account is a data boundary' },
        body: {
          es: 'Carrito, favoritos, direcciones y pedidos se vinculan al usuario. La sincronización serializa las escrituras y limpia el estado al cerrar sesión o cambiar de cuenta.',
          en: 'The bag, favorites, addresses and orders belong to the user. Synchronization serializes writes and clears state on logout or account changes.',
        },
      },
      {
        title: { es: 'Separar demo y pago', en: 'Separate the demo from payment' },
        body: {
          es: 'La demo pública crea pedidos DEMO_UNPAID y no solicita tarjeta. La integración Stripe TEST dispone de firmas e idempotencia; una transacción real contra Stripe Test queda pendiente de credenciales y no se presenta como verificada.',
          en: 'The public demo creates DEMO_UNPAID orders and never requests a card. The Stripe TEST integration includes signature checks and idempotency; a real Stripe Test-account transaction still requires credentials and is not claimed as verified.',
        },
      },
    ],
    results: {
      es: [
        'Compra demo verificada públicamente en escritorio y viewport móvil.',
        'Totales, descuentos e inventario calculados desde PostgreSQL.',
        'Pruebas unitarias, de integración y E2E con CI verificable.',
      ],
      en: [
        'Public demo shopping checked in desktop and mobile viewports.',
        'Totals, discounts and inventory calculated from PostgreSQL.',
        'Unit, integration and E2E checks with verifiable CI.',
      ],
    },
    limits: {
      es: 'Los productos y datos son ficticios. Las fotografías son ilustrativas. No se realizan cobros ni envíos reales y la administración pública está bloqueada. La verificación de un pago en una cuenta Stripe TEST no se ha realizado.',
      en: 'Products and data are fictional. Photography is illustrative. There are no real charges or deliveries, and public administrative writes are blocked. A payment against an actual Stripe TEST account has not been verified.',
    },
    demo: 'https://atelier-commerce-two.vercel.app',
    repo: 'https://github.com/cristoferdiazalvarez/atelier-commerce',
    docs: 'https://github.com/cristoferdiazalvarez/atelier-commerce/blob/main/docs/ARCHITECTURE.md',
    image: '/projects/atelier-home.png',
    mobile: '/projects/atelier-mobile.png',
    tone: 'sand',
    gallery: [
      {
        src: '/projects/atelier-checkout.png',
        alt: {
          es: 'Checkout real de Atelier Commerce con descuento y pedido de demostración sin tarjeta',
          en: 'Actual Atelier Commerce checkout with discount and an unpaid demo order',
        },
        caption: {
          es: 'El servidor valida subtotal, descuento, impuestos y envío antes de confirmar.',
          en: 'The server validates subtotal, discount, tax and shipping before confirmation.',
        },
        ratio: '1440 / 1716',
      },
      {
        src: '/projects/atelier-admin.png',
        alt: {
          es: 'Administración privada real de Atelier Commerce capturada en el entorno local',
          en: 'Actual private Atelier Commerce administration captured in the local environment',
        },
        caption: {
          es: 'Administración privada local. Las escrituras están deshabilitadas en la demo pública.',
          en: 'Private local administration. Writes are disabled in the public demo.',
        },
        ratio: '1440 / 1000',
      },
    ],
  },
  {
    slug: 'flowteam',
    name: 'FlowTeam',
    number: '03',
    category: {
      es: 'SAAS COLABORATIVO · GESTIÓN DE PROYECTOS',
      en: 'COLLABORATIVE SAAS · PROJECT MANAGEMENT',
    },
    subtitle: {
      es: 'Un espacio compartido para dar forma al siguiente paso.',
      en: 'A shared space to move the next idea forward.',
    },
    summary: {
      es: 'Una plataforma de proyectos con demo privada por visitante, Kanban persistente, conversaciones de tareas y permisos comprobados en servidor.',
      en: 'A project workspace with a private demo per visitor, persistent Kanban, task conversations and server-enforced permissions.',
    },
    problem: {
      es: 'Un equipo necesita conectar tareas, contexto y responsables sin perder el trabajo de otra persona. La dificultad no está solo en mover tarjetas: cada consulta debe respetar el workspace, las ediciones simultáneas necesitan detectar conflictos y una demo pública debe permitir explorar sin alterar los datos de otros visitantes.',
      en: 'Teams need to connect tasks, context and ownership without losing somebody else’s work. Moving cards is only part of the problem: every query must respect workspace boundaries, concurrent edits must detect conflicts, and a public demo must let visitors explore without changing somebody else’s data.',
    },
    approach: {
      es: 'Construí una experiencia compartida de panel, tablero, lista, calendario y detalle de tarea con Next.js y TypeScript. Better Auth gestiona las sesiones; Zod y los permisos del servidor validan las operaciones. Prisma y PostgreSQL conservan tareas, comentarios y actividad. Cada visitante de la demo recibe un workspace independiente con datos ficticios editables y métricas calculadas desde sus registros.',
      en: 'I built a connected dashboard, board, list, calendar and task-detail experience with Next.js and TypeScript. Better Auth manages sessions; Zod and server authorization validate operations. Prisma and PostgreSQL persist tasks, comments and activity. Each demo visitor receives an independent workspace with editable fictional data and metrics calculated from its records.',
    },
    scope: {
      es: 'Interfaz, sesiones, equipos, Kanban, API, datos y verificación.',
      en: 'Interface, sessions, teams, Kanban, API, data and verification.',
    },
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Better Auth',
      'TanStack Query',
      'dnd-kit',
      'Vitest',
      'Playwright',
      'GitHub Actions',
    ],
    features: {
      es: [
        'Workspaces privados, roles e invitaciones',
        'Kanban persistente con control de versión',
        'Comentarios, checklist y adjuntos privados',
      ],
      en: [
        'Private workspaces, roles and invitations',
        'Persistent Kanban with version checks',
        'Comments, checklists and private attachments',
      ],
    },
    architecture: ['Browser', 'Next.js + Better Auth', 'Prisma', 'PostgreSQL'],
    decisions: [
      {
        title: {
          es: 'Una demo aislada y permisos reales',
          en: 'An isolated demo with real permissions',
        },
        body: {
          es: 'Cada visitante obtiene una identidad de invitado y un workspace propio. OWNER, ADMIN y MEMBER se comprueban en servidor; conocer el ID o el enlace de una tarea no concede acceso. Las invitaciones usan tokens seguros, caducan y pueden revocarse.',
          en: 'Each visitor gets a guest identity and a private workspace. OWNER, ADMIN and MEMBER checks run on the server; knowing a task ID or link does not grant access. Invitations use secure tokens, expire and can be revoked.',
        },
      },
      {
        title: {
          es: 'Colaboración por HTTP, con un coste explicado',
          en: 'HTTP collaboration with an explicit cost model',
        },
        body: {
          es: 'TanStack Query consulta los datos mediante polling cada 3 segundos mientras la pestaña está activa. No es WebSockets ni actualización instantánea. Una pestaña activa genera unas 1.200 peticiones por hora, además de autenticación y acciones; puede mantener PostgreSQL despierto y consumir las cuotas gratuitas de cómputo y transferencia.',
          en: 'TanStack Query polls data over HTTP every 3 seconds while the tab is active. This is not WebSockets or instant push. One active tab generates about 1,200 requests per hour, plus authentication and actions; it can keep PostgreSQL awake and consume free compute and transfer allowances.',
        },
      },
      {
        title: {
          es: 'Detectar conflictos y conservar el orden',
          en: 'Detect conflicts and preserve ordering',
        },
        body: {
          es: 'Las ediciones y movimientos requieren la versión observada de la tarea. Una escritura obsoleta recibe un conflicto en lugar de sobrescribir cambios silenciosamente. Las transacciones y los bloqueos de proyecto mantienen el orden del tablero; la interfaz revierte un movimiento optimista si falla la persistencia.',
          en: 'Edits and moves require the task’s observed version. A stale write returns a conflict instead of silently overwriting changes. Transactions and project locks preserve board order; the interface rolls back an optimistic move if persistence fails.',
        },
      },
      {
        title: {
          es: 'Archivos privados dentro de un presupuesto de demo',
          en: 'Private files within a demo-sized budget',
        },
        body: {
          es: 'En Vercel, los adjuntos pequeños se guardan en PostgreSQL y se descargan solo después de comprobar la membresía. Las cuotas transaccionales limitan cada archivo a 1 MiB, cada workspace a 5 MiB y el total binario a 100 MiB. Evita otro proveedor, a cambio de consumir espacio y transferencia de la base gratuita.',
          en: 'On Vercel, small attachments live in PostgreSQL and downloads require a membership check. Transactional quotas cap files at 1 MiB, each workspace at 5 MiB and total binary data at 100 MiB. This avoids another provider while consuming space and transfer from the free database.',
        },
      },
    ],
    results: {
      es: [
        'Demo HTTPS utilizable sin formulario de registro ni tarjeta, con datos ficticios privados por visitante.',
        '6 pruebas unitarias, 12 de integración y 11 escenarios E2E; los 11 también pasan contra HTTPS, sin omisiones móviles.',
        'Sincronización comprobada entre dos usuarios con sesiones distintas; roles, persistencia y descargas privadas verificados.',
        'GitHub Actions en verde y capturas auténticas de producción.',
      ],
      en: [
        'An HTTPS demo usable without a registration form or card, with private fictional data per visitor.',
        '6 unit tests, 12 integration tests and 11 E2E scenarios; all 11 also pass against HTTPS, with no mobile skips.',
        'Synchronization checked with two users and distinct sessions; roles, persistence and private downloads verified.',
        'Passing GitHub Actions and authentic production screenshots.',
      ],
    },
    limits: {
      es: 'Es un proyecto de portfolio con personas, equipos y tareas ficticios. La colaboración usa polling cada 3 segundos, no WebSockets; no hay presencia ni coedición instantánea de texto. La entrega de email y la recuperación de contraseña están pendientes. Los adjuntos tienen cuotas de demo y no sustituyen un servicio de archivos grandes. Las cuotas gratuitas pueden agotarse y pausar el servicio.',
      en: 'This is a portfolio project with fictional people, teams and tasks. Collaboration uses 3-second polling, not WebSockets; presence and instant text coediting are not implemented. Email delivery and password recovery remain pending. Demo-sized attachment quotas do not replace large-file storage. Free allowances can be exhausted and pause service.',
    },
    demo: 'https://flowteam-ten.vercel.app',
    repo: 'https://github.com/cristoferdiazalvarez/flowteam',
    docs: 'https://github.com/cristoferdiazalvarez/flowteam/blob/main/docs/PORTFOLIO.md',
    image: '/projects/flowteam-overview.webp',
    mobile: '/projects/flowteam-mobile.webp',
    tone: 'violet',
    coverAlt: {
      es: 'Panel real de FlowTeam con proyectos, tareas y métricas del workspace ficticio Orbit Studio',
      en: 'Actual FlowTeam dashboard with projects, tasks and metrics for the fictional Orbit Studio workspace',
    },
    verified: {
      es: 'FlowTeam: verificado en producción el 14 de noviembre de 2026',
      en: 'FlowTeam: verified in production on 14 November 2026',
    },
    social: {
      src: '/projects/flowteam-social.webp',
      width: 1200,
      height: 630,
      alt: {
        es: 'Vista auténtica del panel de FlowTeam con datos ficticios de demostración',
        en: 'Authentic FlowTeam dashboard with fictional demo data',
      },
    },
    gallery: [
      {
        src: '/projects/flowteam-board.webp',
        alt: {
          es: 'Tablero Kanban real de FlowTeam con columnas, tareas, prioridades y responsables ficticios',
          en: 'Actual FlowTeam Kanban board with columns, tasks, priorities and fictional assignees',
        },
        caption: {
          es: 'Tablero persistente capturado en la demo HTTPS; los movimientos se guardan en PostgreSQL.',
          en: 'Persistent board captured from the HTTPS demo; movements are saved in PostgreSQL.',
        },
        ratio: '1440 / 1256',
      },
      {
        src: '/projects/flowteam-task.webp',
        alt: {
          es: 'Detalle real de una tarea de FlowTeam con conversación y checklist de demostración',
          en: 'Actual FlowTeam task detail with a demonstration conversation and checklist',
        },
        caption: {
          es: 'Contexto, conversación y checklist en una tarea real de la demo; los datos son ficticios.',
          en: 'Context, conversation and checklist on an actual demo task; the data is fictional.',
        },
        ratio: '1440 / 1423',
      },
      {
        src: '/projects/flowteam-mobile.webp',
        alt: {
          es: 'Vista móvil auténtica de FlowTeam con navegación y tablero Kanban de demostración',
          en: 'Authentic mobile FlowTeam view with navigation and demonstration Kanban board',
        },
        caption: {
          es: 'Recorte del viewport móvil publicado, optimizado para web sin inventar ni reconstruir la interfaz.',
          en: 'Crop of the published mobile viewport, optimized for the web without generating or reconstructing the interface.',
        },
        ratio: '585 / 1266',
        layout: 'mobile',
      },
    ],
  },
  {
    slug: 'nexora',
    name: 'NEXORA',
    number: '04',
    category: {
      es: 'SAAS · EXPRESS & MONGODB',
      en: 'SAAS · EXPRESS & MONGODB',
    },
    subtitle: {
      es: 'Una visión clara de clientes, catálogo y facturación.',
      en: 'A clear view of customers, catalog and invoicing.',
    },
    summary: {
      es: 'Un SaaS empresarial con organizaciones independientes, sesiones seguras y facturas calculadas en servidor, publicado con React, Express y MongoDB.',
      en: 'A business SaaS with independent organizations, secure sessions and server-calculated invoices, deployed with React, Express and MongoDB.',
    },
    problem: {
      es: 'Clientes, catálogo y facturas deben compartir un flujo coherente sin mezclar datos de distintas empresas. Los permisos y los importes necesitan validarse en el servidor, incluso cuando se manipula una petición del navegador.',
      en: 'Customers, catalog and invoices need a coherent workflow without mixing data between companies. Permissions and amounts must be validated on the server, including when a browser request is manipulated.',
    },
    approach: {
      es: 'Construí un monorepo React/Vite y Express con TypeScript. La API obtiene empresa y rol de la sesión y limita cada operación en MongoDB. El frontend y su proxy se alojan en Vercel Hobby; la API usa Render Free y una base Atlas M0 independiente.',
      en: 'I built a React/Vite and Express monorepo with TypeScript. The API resolves organization and role from the session and scopes every MongoDB operation. The frontend and its proxy run on Vercel Hobby, with the API on Render Free and an independent Atlas M0 database.',
    },
    scope: {
      es: 'Interfaz, API, aislamiento empresarial, facturación y despliegue verificado.',
      en: 'Interface, API, organization isolation, invoicing and verified deployment.',
    },
    tech: [
      'React',
      'TypeScript',
      'Express',
      'MongoDB',
      'Vite',
      'Tailwind CSS',
      'Mongoose',
      'TanStack Query',
      'Zod',
      'Vitest',
      'Playwright',
    ],
    features: {
      es: [
        'Sesiones HttpOnly y roles por organización',
        'Clientes, catálogo, facturas PDF e impuestos configurables',
        'Dashboard real, filtros y diseño claro/oscuro responsive',
      ],
      en: [
        'HttpOnly sessions and organization-scoped roles',
        'Customers, catalog, PDF invoices and configurable taxes',
        'Live dashboard, filters and responsive light/dark interface',
      ],
    },
    architecture: [
      'Browser',
      'React + Vite',
      'Vercel proxy',
      'Express API · Render',
      'MongoDB Atlas',
    ],
    decisions: [
      {
        title: {
          es: 'Una sesión, un origen web',
          en: 'One session, one web origin',
        },
        body: {
          es: 'El navegador llama a /api en el mismo origen. Un proxy de servidor conserva la cookie __Host- con Secure, HttpOnly y SameSite=Lax, y autentica su acceso a Render con un secreto que nunca llega al cliente.',
          en: 'The browser calls /api on the same origin. A server proxy preserves a __Host- cookie with Secure, HttpOnly and SameSite=Lax, and authenticates to Render using a secret that never reaches the client.',
        },
      },
      {
        title: {
          es: 'La empresa no la elige el navegador',
          en: 'The browser does not choose the organization',
        },
        body: {
          es: 'La sesión determina usuario, rol y empresa. Consultas, escrituras, estadísticas y PDF incorporan ese límite. Las pruebas de producción comprueban dos empresas independientes y el acceso de un empleado sin permisos de escritura.',
          en: 'The session determines user, role and organization. Queries, writes, statistics and PDFs apply that boundary. Production tests exercise two independent companies and an employee without write permissions.',
        },
      },
      {
        title: {
          es: 'Importes exactos antes del PDF',
          en: 'Exact amounts before the PDF',
        },
        body: {
          es: 'La API descarta los totales enviados y calcula con céntimos enteros, puntos básicos y BigInt en los pasos intermedios. El PDF usa el resultado validado y una instantánea del emisor y del cliente.',
          en: 'The API ignores submitted totals and calculates using integer cents, basis points and BigInt for intermediate operations. The PDF uses the validated result and snapshots of issuer and customer details.',
        },
      },
    ],
    results: {
      es: [
        'Aplicación pública por HTTPS con persistencia en Atlas.',
        'Registro, login/logout, CRUD, PDF, roles y aislamiento probados en producción.',
        '20 pruebas de unidad/integración y dos flujos E2E; capturas reales con información ficticia.',
      ],
      en: [
        'Public HTTPS application backed by persistent Atlas data.',
        'Registration, login/logout, CRUD, PDF, roles and isolation tested in production.',
        '20 unit/integration tests and two E2E flows; real screenshots with fictional information.',
      ],
    },
    limits: {
      es: 'Demo de portfolio con datos ficticios, sin cobros online ni certificación fiscal del PDF. El registro crea una empresa propia; no se publican contraseñas administrativas. No incluye recuperación de contraseña y Render Free puede tardar en despertar tras inactividad. Las comprobaciones automáticas de accesibilidad no certifican conformidad completa.',
      en: 'Portfolio demo with fictional data, no online charges and no fiscal certification for its PDFs. Registration creates a separate company; administrator passwords are not published. Password recovery is not included, and Render Free may take time to wake after inactivity. Automated accessibility checks do not certify full conformance.',
    },
    demo: 'https://nexora-eta-steel.vercel.app',
    repo: 'https://github.com/cristoferdiazalvarez/nexora',
    docs: 'https://github.com/cristoferdiazalvarez/nexora/blob/main/docs/DEPLOYMENT.md',
    image: '/projects/nexora-dashboard.webp',
    mobile: '/projects/nexora-mobile.webp',
    tone: 'violet',
    coverAlt: {
      es: 'Dashboard real de NEXORA publicado, con datos ficticios de Estudio Horizonte',
      en: 'Actual published NEXORA dashboard with fictional Estudio Horizonte data',
    },
    verified: {
      es: 'Flujos completos comprobados sobre la URL pública el 16 de noviembre de 2026.',
      en: 'Complete flows checked against the public URL on November 16, 2026.',
    },
    gallery: [
      {
        src: '/projects/nexora-invoices.webp',
        alt: {
          es: 'Listado real de facturas de NEXORA con importes y estados de pago ficticios',
          en: 'Actual NEXORA invoices with fictional amounts and payment statuses',
        },
        caption: {
          es: 'Facturas persistentes, búsqueda, estados de pago y descarga PDF desde la aplicación publicada.',
          en: 'Persistent invoices, search, payment statuses and PDF download in the published application.',
        },
        ratio: '1440 / 1238',
      },
      {
        src: '/projects/nexora-mobile.webp',
        alt: {
          es: 'NEXORA en móvil con navegación y tabla de facturas',
          en: 'Mobile NEXORA with navigation and invoice table',
        },
        caption: {
          es: 'Captura real a 390 píxeles; la tabla conserva desplazamiento horizontal propio sin desbordar la página.',
          en: 'Actual 390-pixel capture; the table retains its own horizontal scrolling without overflowing the page.',
        },
        ratio: '390 / 1210',
        layout: 'mobile',
      },
    ],
  },
  {
    slug: 'devdesk',
    name: 'DevDesk',
    number: '05',
    category: { es: 'HELPDESK SAAS · SOPORTE TÉCNICO', en: 'HELPDESK SAAS · TECHNICAL SUPPORT' },
    subtitle: {
      es: 'Incidencias claras, soporte organizado.',
      en: 'Clear issues, organized support.',
    },
    summary: {
      es: 'Plataforma de soporte con tickets, prioridades, conversación, permisos por rol y un panel conectado a PostgreSQL.',
      en: 'Support platform with tickets, priorities, conversations, role permissions and a PostgreSQL-backed dashboard.',
    },
    problem: {
      es: 'Un equipo de soporte necesita seguir incidencias sin perder el contexto ni exponer información de otros clientes. El sistema debe distinguir entre quien solicita ayuda y quien la gestiona.',
      en: 'Support teams need to track issues without losing context or exposing other customers’ information. The system must distinguish between people requesting support and those managing it.',
    },
    approach: {
      es: 'Construí un frontend React y TypeScript con una API Express independiente. PostgreSQL y Prisma conservan tickets, comentarios e historial. Las sesiones con cookies HttpOnly, Zod y las comprobaciones de rol en la API delimitan qué puede consultar o modificar cada persona.',
      en: 'I built a React and TypeScript frontend with a separate Express API. PostgreSQL and Prisma persist tickets, comments and history. HttpOnly cookie sessions, Zod and server-side role checks determine what each person can read or change.',
    },
    scope: {
      es: 'Frontend, API REST, autenticación, tickets, persistencia, pruebas y despliegue.',
      en: 'Frontend, REST API, authentication, tickets, persistence, tests and deployment.',
    },
    tech: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Zod', 'Playwright', 'GitHub Actions'],
    features: {
      es: ['Dashboard y filtros de tickets', 'Roles cliente, agente y administrador', 'Comentarios, prioridades e historial'],
      en: ['Dashboard and ticket filters', 'Customer, agent and administrator roles', 'Comments, priorities and event history'],
    },
    architecture: ['Browser', 'React + Vite', 'Express API · Render', 'Prisma', 'PostgreSQL · Neon'],
    decisions: [
      {
        title: { es: 'El permiso se comprueba en la API', en: 'Authorization is checked in the API' },
        body: {
          es: 'El acceso a tickets depende del rol y la asignación; las notas internas se reservan al personal de soporte. La demo pública se presenta en modo solo lectura.',
          en: 'Ticket access depends on role and assignment; internal notes are restricted to support staff. The public demo is presented in read-only mode.',
        },
      },
      {
        title: { es: 'Frontend y servidor independientes', en: 'Independent frontend and server' },
        body: {
          es: 'Vercel sirve React por HTTPS, Render ejecuta Express y Neon conserva la información en PostgreSQL. Las migraciones se aplican antes del arranque del servicio.',
          en: 'Vercel serves React over HTTPS, Render runs Express and Neon stores data in PostgreSQL. Database migrations run before the service starts.',
        },
      },
    ],
    results: {
      es: [
        'Frontend en Vercel y API en Render desplegados por HTTPS.',
        'Migraciones Prisma aplicadas y datos ficticios disponibles en Neon.',
        'GitHub Actions pasó las verificaciones de tipo, lint, tests, build y Playwright.',
      ],
      en: [
        'Frontend on Vercel and API on Render deployed over HTTPS.',
        'Prisma migrations applied with fictional data available in Neon.',
        'GitHub Actions passed type checking, lint, tests, build and Playwright.',
      ],
    },
    limits: {
      es: 'Proyecto personal con datos ficticios. La demo pública es de solo lectura y no representa una operación de atención al cliente real. La disponibilidad de Render Free puede variar tras periodos de inactividad. La captura de portada es una ilustración de la interfaz, no una captura de producción.',
      en: 'Personal project with fictional data. The public demo is read-only and does not represent a live customer support operation. Render Free availability may vary after inactivity. The cover image is an interface illustration, not a production screenshot.',
    },
    demo: 'https://devdesk-theta.vercel.app/',
    repo: 'https://github.com/cristoferdiazalvarez/devdesk',
    docs: 'https://github.com/cristoferdiazalvarez/devdesk/blob/main/docs/api.md',
    image: '/projects/devdesk-illustration.svg',
    mobile: '/projects/devdesk-illustration.svg',
    tone: 'violet',
    coverAlt: {
      es: 'Ilustración de un panel de soporte DevDesk con tarjetas y tickets ficticios',
      en: 'Illustration of a DevDesk support dashboard with fictional cards and tickets',
    },
    verified: {
      es: 'Frontend y API desplegados; migraciones verificadas el 18 de noviembre de 2026.',
      en: 'Frontend and API deployed; migrations verified on 18 November 2026.',
    },
    gallery: [
      {
        src: '/projects/devdesk-illustration.svg',
        alt: {
          es: 'Ilustración editorial del dashboard de DevDesk',
          en: 'Editorial illustration of the DevDesk dashboard',
        },
        caption: {
          es: 'Ilustración de presentación; la interfaz auténtica puede explorarse en la demo pública.',
          en: 'Presentation illustration; explore the actual interface in the public demo.',
        },
        ratio: '1440 / 900',
      },
    ],
  },
];
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function projectDescription(slug: string, locale: Locale) {
  return getProject(slug)?.summary[locale];
}

export function nextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
export function projectCoverAlt(project: Project, locale: Locale) {
  return (
    project.coverAlt?.[locale] ??
    (project.slug === 'businessos'
      ? project.gallery[0].alt[locale]
      : locale === 'es'
        ? 'Vista real de la tienda Atelier Commerce'
        : 'Actual Atelier Commerce storefront')
  );
}
