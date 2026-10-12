import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  X,
  ShoppingBag,
  Menu,
  MessageCircle,
  Ruler,
  Check,
  Crosshair,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";
import { products, type Product } from "../lib/products";
type Item = { product: Product; size: string; quantity: number };
const contacts = ["3413618729", "3416668425"];
const waLink = (phone: string, message: string) =>
  `https://wa.me/549${phone}?text=${encodeURIComponent(message)}`;

function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Alta Presión L Y N, inicio">
      <span className="brand-symbol">
        AP
        <span />
      </span>
      <span className="brand-type">
        ALTA PRESIÓN <em>L Y N</em>
        <small>GORRITAS DE SOLDADOR</small>
      </span>
    </a>
  );
}

export default function Catalog() {
  const [filter, setFilter] = useState("Todos");
  const [modal, setModal] = useState<"product" | "order" | "contact" | "sizes" | null>(null);
  const [selected, setSelected] = useState<Product>(products[0]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState("A confirmar");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [menu, setMenu] = useState(false);
  const [note, setNote] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (modal && dialog) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (dialog?.open) dialog.close();
    document.body.style.overflow = modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  const openProduct = (product: Product) => {
    setSelected(product);
    setPhotoIndex(0);
    setExpanded(false);
    setSize("A confirmar");
    setQuantity(1);
    setModal("product");
  };
  const add = () => {
    setItems((previous) => {
      const found = previous.find((i) => i.product.id === selected.id && i.size === size);
      return found
        ? previous.map((i) => (i === found ? { ...i, quantity: i.quantity + quantity } : i))
        : [...previous, { product: selected, size, quantity }];
    });
    setModal("order");
  };
  const message = items.length
    ? `¡Hola, Alta Presión L Y N! Me interesa consultar por estos modelos:\n${items.map((i) => `• ${i.product.name} (${i.product.id}) — ${i.product.category} — talle: ${i.size} — cantidad: ${i.quantity}`).join("\n")}\n¿Me confirman precio y disponibilidad?${note ? `\nMi consulta: ${note}` : ""}`
    : "¡Hola, Alta Presión L Y N! Quiero consultar por las gorras cortas y sureñas. ¿Me pasan los modelos disponibles, talles y precios?";
  return (
    <>
      <div className="topline">
        <span>PARA LOS QUE HACEN. PARA LOS QUE SUELDAN.</span>
        <span>
          CONSULTAS Y PEDIDOS POR WHATSAPP <ArrowUpRight size={12} />
        </span>
      </div>
      <header className="header wrap">
        <Brand />
        <nav className={menu ? "navigation open" : "navigation"}>
          <a onClick={() => setMenu(false)} href="#catalogo">
            Catálogo
          </a>
          <a onClick={() => setMenu(false)} href="#como-pedir">
            Cómo pedir
          </a>
          <a onClick={() => setMenu(false)} href="#contacto">
            Contacto
          </a>
        </nav>
        <div className="header-actions">
          <button className="order-button" onClick={() => setModal("order")}>
            <ShoppingBag size={17} />
            <span>Mi pedido</span>
            <b>{count}</b>
          </button>
          <button
            className="mobile-menu"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section id="inicio" className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="orange-square" /> ROSARIO · SANTA FE · ARGENTINA
            </div>
            <h1>
              EL OFICIO
              <br />
              SE LLEVA
              <br />
              <span>EN LA CABEZA.</span>
            </h1>
            <p>
              Gorras cortas y sureñas con actitud de taller.
              <br className="desktop-break" /> Elegí tu estilo. Nosotros te ayudamos con el resto.
            </p>
            <div className="hero-buttons">
              <a className="button primary" href="#catalogo">
                Explorar catálogo <ArrowUpRight size={19} />
              </a>
              <button className="text-button" onClick={() => setModal("contact")}>
                <MessageCircle size={18} /> Hablemos
              </button>
            </div>
            <div className="hero-foot">
              <span>ALTA PRESIÓN L Y N</span>
              <span>EL DETALLE HACE LA DIFERENCIA.</span>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/taller.webp"
              alt="Chispas de soldadura en un taller"
              fetchPriority="high"
            />
            <div className="photo-corner">
              <Crosshair size={22} />
              <span>
                EL TRABAJO HABLA.
                <br />
                TU ESTILO TAMBIÉN.
              </span>
            </div>
            <div className="photo-caption">
              <span>INSPIRADOS EN EL TALLER</span>
              <span>01 / AP</span>
            </div>
            <span className="vertical-caption">PASIÓN POR EL OFICIO — ALTA PRESIÓN L Y N</span>
          </div>
        </section>
        <div className="values-strip">
          <div className="wrap">
            <span>
              <Crosshair size={18} /> ESTILO DE TALLER
            </span>
            <i />
            <span>
              <Ruler size={18} /> ENCONTRÁ TU TALLE
            </span>
            <i />
            <span>
              <MessageCircle size={18} /> ATENCIÓN DIRECTA
            </span>
            <i />
            <span>
              <ShoppingBag size={18} /> PEDÍ POR WHATSAPP
            </span>
          </div>
        </div>
        <section id="catalogo" className="catalog-section wrap">
          <div className="section-heading">
            <div>
              <div className="eyebrow muted">01 / NUESTROS MODELOS</div>
              <h2>TU PRÓXIMA GORRITA.</h2>
            </div>
            <p>
              Distintos estilos. El mismo oficio.
              <br />
              Encontrá la que va con vos.
            </p>
          </div>
          <div className="catalog-controls">
            <div className="filters">
              {["Todos", "Cortas", "Sureñas"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  className={filter === f ? "active" : ""}
                  onClick={() => setFilter(f)}
                >
                  {f}
                  <span>
                    {f === "Todos"
                      ? products.length
                      : products.filter((p) => p.category === f).length}
                  </span>
                </button>
              ))}
            </div>
            <button className="size-link" onClick={() => setModal("sizes")}>
              <Ruler size={16} /> Cómo elegir tu talle <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => filter === "Todos" || p.category === filter)
              .map((p) => (
                <article className="product" key={p.id}>
                  <button
                    className="product-image"
                    onClick={() => openProduct(p)}
                    aria-label={`Ver ${p.name}`}
                  >
                    <span className="sample-tag">
                      {p.category === "Sureñas" ? "GORRA SUREÑA" : "GORRA CORTA"}
                      {p.images.length > 1 ? ` · ${p.images.length} VISTAS` : ""}
                    </span>
                    <img
                      src={`/images/${p.image}.webp`}
                      alt={`Gorra ${p.name.toLowerCase()} de Alta Presión L Y N`}
                      loading="lazy"
                    />
                    <span className="view-product">
                      <Plus size={19} />
                    </span>
                    <span className="product-ref">{p.id}</span>
                  </button>
                  <div className="product-info">
                    <div className="product-category">
                      {p.category === "Sureñas" ? "SUREÑA · FORMATO LARGO" : "CORTA · CON VISERA"}{" "}
                      <span style={{ background: p.color }} />
                    </div>
                    <h3>{p.name}</h3>
                    <div className="product-bottom">
                      <span>Precio a consultar</span>
                      <button onClick={() => openProduct(p)}>
                        Elegir modelo <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          <div className="sample-notice">
            <span className="orange-square" />
            <p>
              Fotos de nuestros modelos. Elegí entre gorras cortas y sureñas de formato largo.
              Consultá talles, precios y disponibilidad por WhatsApp. Los nombres describen el
              diseño de cada foto.
            </p>
          </div>
        </section>
        <section id="como-pedir" className="how-section">
          <div className="wrap how-layout">
            <div>
              <div className="eyebrow muted">02 / SIMPLE Y DIRECTO</div>
              <h2>
                DE ACÁ
                <br />
                <span>AL TALLER.</span>
              </h2>
              <p>
                Sin vueltas. Sin formularios eternos.
                <br />
                Tu pedido empieza con una charla.
              </p>
            </div>
            <div className="steps">
              {[
                {
                  n: "01",
                  title: "Elegí tu modelo",
                  text: "Recorré el catálogo y agregá tus favoritos al pedido.",
                },
                {
                  n: "02",
                  title: "Contanos lo que necesitás",
                  text: "Elegí un talle o pedinos ayuda. También podés consultar por varias unidades.",
                },
                {
                  n: "03",
                  title: "Lo coordinamos por WhatsApp",
                  text: "Confirmamos el modelo, el precio, la disponibilidad y la forma de entrega.",
                },
              ].map((s) => (
                <div className="step" key={s.n}>
                  <span>{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <ArrowUpRight size={21} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contacto" className="contact-section wrap">
          <div className="eyebrow">03 / HABLEMOS</div>
          <div className="contact-layout">
            <div>
              <h2>
                ¿LISTO PARA
                <br />
                <span>LA PRÓXIMA?</span>
              </h2>
              <p>
                Somos de Rosario, Santa Fe, Argentina.
                <br />
                Consultá talles, modelos y precios.
                <br />
                Elegí cualquiera de nuestros dos contactos oficiales.
              </p>
            </div>
            <div className="contact-links">
              {contacts.map((phone, i) => (
                <a
                  key={phone}
                  href={waLink(phone, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={23} />
                  <span>
                    <small>WHATSAPP OFICIAL {i + 1}</small>+54 9 {phone.slice(0, 3)}{" "}
                    {phone.slice(3, 6)} {phone.slice(6)}
                  </span>
                  <ArrowUpRight size={24} />
                </a>
              ))}
              <small className="contact-note">
                El mensaje se abre en WhatsApp. Vos decidís cuándo enviarlo.
              </small>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <Brand />
        <span>EL OFICIO SE LLEVA CON ORGULLO.</span>
        <a href="#inicio">
          Volver arriba <ArrowUpRight size={15} />
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alta Presión L Y N · Rosario, Santa Fe, Argentina</span>
          <span>Las gorritas no reemplazan los elementos de protección personal.</span>
        </div>
      </footer>
      <button
        className="floating-wa"
        aria-label="Consultar por WhatsApp"
        onClick={() => setModal("contact")}
      >
        <MessageCircle size={24} />
      </button>
      <dialog
        ref={dialogRef}
        className="dialog"
        aria-label="Consulta de catálogo"
        onCancel={() => setModal(null)}
      >
        <div className="dialog-content">
          <button
            ref={closeRef}
            className="close-dialog"
            aria-label="Cerrar"
            onClick={() => setModal(null)}
          >
            <X size={22} />
          </button>
          {modal === "product" && (
            <>
              <div className="eyebrow muted">
                {selected.id} / {selected.category === "Sureñas" ? "GORRA SUREÑA" : "GORRA CORTA"}
              </div>
              <div className={expanded ? "product-gallery expanded" : "product-gallery"}>
                <img
                  className="detail-image"
                  src={`/images/${selected.images[photoIndex]}.webp`}
                  alt={`${selected.name}, vista ${photoIndex + 1}`}
                />
                <button
                  className="expand-photo"
                  aria-label={expanded ? "Reducir foto" : "Ampliar foto"}
                  onClick={() => setExpanded(!expanded)}
                >
                  <Expand size={18} />
                </button>
                {selected.images.length > 1 && (
                  <div className="gallery-arrows">
                    <button
                      aria-label="Foto anterior"
                      onClick={() =>
                        setPhotoIndex(
                          (i) => (i - 1 + selected.images.length) % selected.images.length,
                        )
                      }
                    >
                      <ChevronLeft size={21} />
                    </button>
                    <span aria-live="polite">
                      {photoIndex + 1} / {selected.images.length}
                    </span>
                    <button
                      aria-label="Foto siguiente"
                      onClick={() => setPhotoIndex((i) => (i + 1) % selected.images.length)}
                    >
                      <ChevronRight size={21} />
                    </button>
                  </div>
                )}
              </div>
              {selected.images.length > 1 && (
                <div className="gallery-thumbs">
                  {selected.images.map((image, i) => (
                    <button
                      key={image}
                      aria-label={`Ver vista ${i + 1}`}
                      aria-pressed={i === photoIndex}
                      onClick={() => setPhotoIndex(i)}
                    >
                      <img src={`/images/${image}.webp`} alt={`Miniatura vista ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
              <h2>{selected.name}</h2>
              <p>{selected.description}</p>
              {selected.photoSizes && (
                <p className="detail-disclaimer">
                  Talle indicado en la foto: {selected.photoSizes.join(", ")}. Disponibilidad a
                  consultar.
                </p>
              )}
              <p className="detail-disclaimer">
                Foto de nuestro modelo. Materiales, talles, precio y disponibilidad a confirmar por
                WhatsApp.
              </p>
              <label className="field">
                Talle a consultar
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  {["A confirmar", ...(selected.photoSizes ?? ["S", "M", "L", "XL"])].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <div className="quantity-row">
                <span>Cantidad</span>
                <div className="quantity">
                  <button
                    disabled={quantity <= 1}
                    aria-label="Reducir cantidad"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    disabled={quantity >= 99}
                    aria-label="Aumentar cantidad"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button className="button primary full" onClick={add}>
                Agregar a mi pedido <Plus size={19} />
              </button>
            </>
          )}
          {modal === "sizes" && (
            <>
              <div className="eyebrow muted">GUÍA DE TALLE</div>
              <h2>ENCONTRÁ TU AJUSTE.</h2>
              <div className="guide-icon">
                <Ruler size={48} />
              </div>
              <p>
                Medí el contorno de tu cabeza con una cinta métrica, pasando por encima de las cejas
                y de las orejas, sin apretar.
              </p>
              <p>
                Anotá la medida en centímetros y enviala por WhatsApp. Te ayudamos a elegir el talle
                según el modelo disponible.
              </p>
              <div className="info-box">
                Todavía no hay una tabla de medidas confirmada. Los talles del catálogo son opciones
                de consulta, no una garantía de stock o ajuste.
              </div>
              <button className="button primary full" onClick={() => setModal("contact")}>
                Consultar mi talle <ArrowUpRight size={18} />
              </button>
            </>
          )}
          {modal === "order" && (
            <>
              <div className="eyebrow muted">TU SELECCIÓN / {count} UNIDADES</div>
              <h2>MI PEDIDO.</h2>
              {items.length ? (
                <>
                  <div className="order-items">
                    {items.map((item, index) => (
                      <div className="order-item" key={`${item.product.id}-${item.size}`}>
                        <img src={`/images/${item.product.image}.webp`} alt={item.product.name} />
                        <div>
                          <strong>{item.product.name}</strong>
                          <small>Talle: {item.size}</small>
                          <div className="quantity">
                            <button
                              disabled={item.quantity <= 1}
                              aria-label={`Reducir ${item.product.name}`}
                              onClick={() =>
                                setItems((old) =>
                                  old.map((i, n) =>
                                    n === index ? { ...i, quantity: i.quantity - 1 } : i,
                                  ),
                                )
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              disabled={item.quantity >= 99}
                              aria-label={`Aumentar ${item.product.name}`}
                              onClick={() =>
                                setItems((old) =>
                                  old.map((i, n) =>
                                    n === index ? { ...i, quantity: i.quantity + 1 } : i,
                                  ),
                                )
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <button
                          className="remove-item"
                          aria-label={`Quitar ${item.product.name}`}
                          onClick={() => setItems((old) => old.filter((_, n) => n !== index))}
                        >
                          <X size={17} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="field">
                    ¿Algo más que quieras contarnos?
                    <textarea
                      aria-label="Consulta adicional para el pedido"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Tu medida, una consulta, varias unidades…"
                      maxLength={800}
                    />
                  </label>
                  <p className="detail-disclaimer">
                    Esto es una consulta, no una compra. Confirmamos todos los detalles por
                    WhatsApp.
                  </p>
                  <button className="button primary full" onClick={() => setModal("contact")}>
                    Consultar mi pedido <MessageCircle size={19} />
                  </button>
                </>
              ) : (
                <div className="empty-order">
                  <ShoppingBag size={44} />
                  <h3>Tu próximo modelo te espera.</h3>
                  <p>Elegí una gorrita y agregala para armar tu consulta.</p>
                  <button
                    className="button primary full"
                    onClick={() => {
                      setModal(null);
                      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Ver catálogo <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
          {modal === "contact" && (
            <>
              <div className="eyebrow muted">ATENCIÓN DIRECTA</div>
              <h2>
                HABLEMOS POR
                <br />
                WHATSAPP.
              </h2>
              <p>
                {items.length
                  ? "Tu selección está lista. Elegí un contacto para abrir el mensaje con los detalles de tu pedido."
                  : "Elegí un contacto oficial y consultanos por tu próxima gorrita."}
              </p>
              <div className="dialog-contacts">
                {contacts.map((phone, i) => (
                  <a
                    className="button"
                    key={phone}
                    href={waLink(phone, message)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={20} />
                    <span>
                      <small>CONTACTO OFICIAL {i + 1}</small>+54 9 {phone.slice(0, 3)}{" "}
                      {phone.slice(3)}
                    </span>
                    <ArrowUpRight size={19} />
                  </a>
                ))}
              </div>
              <div className="info-box">
                <Check size={17} /> Abrimos el mensaje; no se envía automáticamente.
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
