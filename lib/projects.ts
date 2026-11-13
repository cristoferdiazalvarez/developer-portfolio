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
  gallery: { src: string; alt: Localized; caption: Localized; ratio: string }[];
  tone: 'green' | 'sand';
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
];
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function projectDescription(slug: string, locale: Locale) {
  return getProject(slug)?.summary[locale];
}
