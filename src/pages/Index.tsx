import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const LOGO_IMG = "https://cdn.poehali.dev/projects/db7fef00-a717-4e83-bb30-16a24c1df53c/bucket/fab0f056-cad7-4740-ae66-ffd132f3cfcf.jpg";

const BOOKS = [
  { id: 1, title: "Война и мир", author: "Лев Толстой", genre: "Классика", price: "590 ₽", year: 1869, desc: "Эпопея о судьбах людей в эпоху наполеоновских войн", rating: 5, badge: "Хит" },
  { id: 2, title: "Преступление и наказание", author: "Фёдор Достоевский", genre: "Классика", price: "490 ₽", year: 1866, desc: "Психологический роман о нравственных терзаниях студента Раскольникова", rating: 5, badge: "" },
  { id: 3, title: "Мастер и Маргарита", author: "Михаил Булгаков", genre: "Фантастика", price: "520 ₽", year: 1967, desc: "Философский роман о добре и зле, любви и творчестве", rating: 5, badge: "Популярное" },
  { id: 4, title: "Анна Каренина", author: "Лев Толстой", genre: "Классика", price: "560 ₽", year: 1878, desc: "История трагической любви на фоне светского общества XIX века", rating: 4, badge: "" },
  { id: 5, title: "Идиот", author: "Фёдор Достоевский", genre: "Классика", price: "460 ₽", year: 1869, desc: "Роман о человеке с чистой душой в жестоком мире", rating: 4, badge: "" },
  { id: 6, title: "Доктор Живаго", author: "Борис Пастернак", genre: "Историческая", price: "510 ₽", year: 1957, desc: "Поэтическая проза о революции и любви", rating: 5, badge: "Новинка" },
  { id: 7, title: "Евгений Онегин", author: "Александр Пушкин", genre: "Поэзия", price: "380 ₽", year: 1833, desc: "Роман в стихах — энциклопедия русской жизни", rating: 5, badge: "" },
  { id: 8, title: "Тихий Дон", author: "Михаил Шолохов", genre: "Историческая", price: "620 ₽", year: 1940, desc: "Судьба казачества на переломе эпох", rating: 5, badge: "" },
  { id: 9, title: "Отцы и дети", author: "Иван Тургенев", genre: "Классика", price: "420 ₽", year: 1862, desc: "Столкновение поколений и идей в России XIX века", rating: 4, badge: "" },
];

const GENRES = ["Все", "Классика", "Фантастика", "Историческая", "Поэзия"];

const REVIEWS = [
  { name: "Екатерина М.", text: "Замечательный магазин! Всегда нахожу нужную книгу по отличной цене. Очень довольна качеством изданий.", stars: 5, date: "Март 2026" },
  { name: "Александр В.", text: "Нашёл редкое издание, которое искал несколько месяцев. Спасибо за богатый выбор классики!", stars: 5, date: "Февраль 2026" },
  { name: "Наталья К.", text: "Приятная атмосфера и добрые консультанты. Рекомендую всем любителям хорошей книги.", stars: 5, date: "Январь 2026" },
  { name: "Михаил Д.", text: "Любимая литература по доступной цене — это правда! Покупаю здесь для всей семьи.", stars: 4, date: "Декабрь 2025" },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= n ? "star-filled" : "star-empty"}>★</span>
      ))}
    </span>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const matchesGenre = activeGenre === "Все" || book.genre === activeGenre;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.genre.toLowerCase().includes(q) ||
        book.desc.toLowerCase().includes(q);
      return matchesGenre && matchesSearch;
    });
  }, [searchQuery, activeGenre]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О магазине" },
    { id: "catalog", label: "Каталог" },
    { id: "reviews", label: "Отзывы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", color: "var(--dark)" }}>

      {/* HEADER */}
      <header style={{
        background: "var(--teal)",
        borderBottom: "3px solid var(--yellow)",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 20px rgba(22,60,60,0.25)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>

            {/* Logo */}
            <button onClick={() => scrollTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 46, height: 46,
                borderRadius: "50%",
                overflow: "hidden", flexShrink: 0,
                border: "2px solid var(--yellow)",
                boxShadow: "0 0 0 1px rgba(244,228,155,0.3)",
              }}>
                <img src={LOGO_IMG} alt="Скарабук" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--yellow)", lineHeight: 1, letterSpacing: "0.04em" }}>
                  СКАРАБУК
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", color: "rgba(244,228,155,0.7)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 1 }}>
                  книжный магазин
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden md:flex">
              {navItems.map(item => (
                <button key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link${activeSection === item.id ? " active" : ""}`}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    fontWeight: activeSection === item.id ? 600 : 400,
                    color: activeSection === item.id ? "var(--yellow)" : "rgba(245,240,168,0.8)",
                    padding: "4px 0",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--yellow)", padding: 6 }}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mobile-menu-open md:hidden" style={{ borderTop: "1px solid rgba(245,240,168,0.2)", paddingBottom: 12 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: activeSection === item.id ? "var(--yellow)" : "rgba(245,240,168,0.75)",
                  padding: "11px 0",
                  borderBottom: "1px solid rgba(245,240,168,0.1)",
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="home" style={{
        background: "var(--teal)",
        minHeight: "88vh",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(245,240,168,0.08) 2px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        {/* Diagonal accent */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: "45%", height: "100%",
          background: "linear-gradient(135deg, transparent 40%, rgba(22,60,60,0.4) 100%)",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "60px 24px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
            className="grid-cols-1 md:grid-cols-2">

            {/* Text */}
            <div>
              <div className="fade-in-up delay-1" style={{
                display: "inline-block",
                background: "var(--yellow)", color: "var(--teal-dark)",
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
                padding: "5px 14px", marginBottom: 24,
              }}>
                ◆ Любимая литература по доступной цене
              </div>
              <h1 className="fade-in-up delay-2" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 400, lineHeight: 1.1,
                color: "var(--yellow)", marginBottom: 20,
              }}>
                Сакральный<br />
                <span style={{ fontStyle: "italic", fontWeight: 300 }}>мир книг</span>
              </h1>
              <p className="fade-in-up delay-3" style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.75,
                color: "rgba(245,240,168,0.75)", marginBottom: 40, maxWidth: 420,
              }}>
                Большой выбор классической и современной литературы. Приходите — здесь каждый найдёт книгу по душе.
              </p>
              <div className="fade-in-up delay-4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-yellow" onClick={() => scrollTo("catalog")}>
                  Перейти в каталог
                </button>
                <button className="btn-outline-teal" style={{ borderColor: "var(--yellow)", color: "var(--yellow)" }}
                  onClick={() => scrollTo("contacts")}>
                  Связаться с нами
                </button>
              </div>
              <div className="fade-in-up delay-5" style={{ marginTop: 52, display: "flex", gap: 36 }}>
                {[["5 000+", "книг в наличии"], ["15+", "лет работы"], ["★ 4.9", "рейтинг"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 700, color: "var(--yellow)", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: "rgba(245,240,168,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual card */}
            <div className="fade-in-up delay-3 hidden md:flex" style={{ justifyContent: "center", alignItems: "center" }}>
              <div style={{
                width: 300, height: 380,
                background: "var(--yellow)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: 32,
                boxShadow: "12px 12px 0 rgba(22,60,60,0.3), -4px -4px 0 rgba(245,240,168,0.15)",
                position: "relative",
              }}>
                <div style={{ fontSize: "5rem", marginBottom: 16 }}>📚</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 700, color: "var(--teal-dark)", textAlign: "center", lineHeight: 1.1 }}>
                  СКАРАБУК
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", color: "var(--teal)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8 }}>
                  книжный магазин
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "var(--teal)", height: 6,
                }} />
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "var(--teal)", color: "var(--yellow)",
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem",
                  fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "4px 10px",
                }}>
                  Якушева д.3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll arrow */}
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: "rgba(245,240,168,0.4)", textAlign: "center" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 24px", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
            className="grid-cols-1 md:grid-cols-2">

            {/* Visual */}
            <div style={{ position: "relative" }}>
              <div style={{
                background: "var(--teal)", padding: "48px 40px",
                borderBottom: "5px solid var(--yellow)",
              }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>📖</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 400, color: "var(--yellow)", marginBottom: 12, lineHeight: 1.2 }}>
                  «Любимая литература по доступной цене»
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,168,0.6)", letterSpacing: "0.1em" }}>
                  — девиз магазина Скарабук
                </div>
              </div>
              <div style={{
                background: "var(--yellow)", padding: "20px 40px",
                display: "flex", gap: 40,
              }}>
                {[["5 000+", "книг"], ["★ 4.9", "рейтинг"], ["15+", "лет"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--teal-dark)" }}>{n}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--teal)", fontFamily: "'Montserrat'", marginBottom: 14, fontWeight: 600 }}>
                ◆ &nbsp; О нас
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--dark)", marginBottom: 20, lineHeight: 1.2 }}>
                Книжный магазин<br />
                <em style={{ fontStyle: "italic", color: "var(--teal)" }}>с душой и традицией</em>
              </h2>
              <div style={{ width: 50, height: 3, background: "var(--teal)", marginBottom: 28 }} />
              <p style={{ fontFamily: "'Montserrat'", fontSize: "0.9rem", lineHeight: 1.85, color: "#4A6060", marginBottom: 20 }}>
                Скарабук — это место, где книги живут. Мы бережно собираем коллекцию для тех, кто ценит настоящую литературу и не хочет переплачивать.
              </p>
              <p style={{ fontFamily: "'Montserrat'", fontSize: "0.9rem", lineHeight: 1.85, color: "#4A6060", marginBottom: 32 }}>
                В нашем магазине по адресу <strong style={{ color: "var(--teal)" }}>Якушева д.3</strong> вы найдёте классику, современную прозу, поэзию и редкие издания. Каждый покупатель — желанный гость.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: "BookOpen", text: "Широкий выбор жанров и авторов" },
                  { icon: "Tag", text: "Доступные цены без наценок" },
                  { icon: "Heart", text: "Индивидуальный подбор книг" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: "var(--teal-pale)", border: "1px solid var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={icon} size={16} color="var(--teal)" />
                    </div>
                    <span style={{ fontFamily: "'Montserrat'", fontSize: "0.85rem", color: "var(--dark)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="diamond-divider">
            <span style={{ fontSize: "1rem" }}>◆</span>
          </div>
        </div>
      </div>

      {/* CATALOG */}
      <section id="catalog" style={{ padding: "90px 24px" }} className="pattern-dots">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--teal)", fontFamily: "'Montserrat'", marginBottom: 14, fontWeight: 600 }}>
              ◆ &nbsp; Наши книги
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--dark)" }}>
              Каталог литературы
            </h2>
            <div className="diamond-divider" style={{ maxWidth: 260, margin: "18px auto 0" }}>
              <span style={{ fontSize: "0.8rem" }}>◆</span>
            </div>
          </div>

          {/* Search */}
          <div style={{ maxWidth: 520, margin: "0 auto 32px", position: "relative" }}>
            <input
              className="search-input"
              type="text"
              placeholder="Поиск по названию, автору, жанру..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "var(--teal)", pointerEvents: "none" }}>
              <Icon name="Search" size={18} />
            </span>
          </div>

          {/* Genre filters */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            {GENRES.map(genre => (
              <button key={genre}
                onClick={() => setActiveGenre(genre)}
                style={{
                  padding: "7px 18px",
                  background: activeGenre === genre ? "var(--teal)" : "transparent",
                  color: activeGenre === genre ? "var(--yellow)" : "var(--teal)",
                  border: `2px solid var(--teal)`,
                  fontFamily: "'Montserrat'",
                  fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: 600,
                }}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Count */}
          {searchQuery && (
            <p style={{ textAlign: "center", fontFamily: "'Montserrat'", fontSize: "0.8rem", color: "var(--teal)", marginBottom: 24, fontWeight: 500 }}>
              Найдено: {filteredBooks.length} {filteredBooks.length === 1 ? "книга" : filteredBooks.length < 5 ? "книги" : "книг"}
            </p>
          )}

          {/* Books grid */}
          {filteredBooks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>📚</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--teal)" }}>Книги не найдены</p>
              <p style={{ fontFamily: "'Montserrat'", fontSize: "0.82rem", color: "#888", marginTop: 8 }}>Попробуйте изменить запрос</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
              {filteredBooks.map(book => (
                <div key={book.id} className="book-card" style={{
                  background: "#fff",
                  borderTop: "4px solid var(--teal)",
                  padding: "26px 22px",
                  boxShadow: "0 2px 16px rgba(45,139,138,0.07)",
                  position: "relative",
                }}>
                  {book.badge && (
                    <div style={{
                      position: "absolute", top: -4, right: 18,
                      background: "var(--yellow)", color: "var(--teal-dark)",
                      fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase",
                      fontFamily: "'Montserrat'", fontWeight: 700,
                      padding: "3px 10px",
                      borderBottom: "2px solid var(--teal)",
                    }}>
                      {book.badge}
                    </div>
                  )}
                  <div style={{ marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Montserrat'", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 500 }}>
                      {book.genre} · {book.year}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--dark)", marginBottom: 4, lineHeight: 1.2 }}>
                    {book.title}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: "0.78rem", color: "var(--teal)", marginBottom: 12, fontStyle: "italic" }}>
                    {book.author}
                  </p>
                  <p style={{ fontFamily: "'Montserrat'", fontSize: "0.8rem", color: "#6A8080", lineHeight: 1.65, marginBottom: 18 }}>
                    {book.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(45,139,138,0.15)", paddingTop: 14 }}>
                    <Stars n={book.rating} />
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--teal-dark)" }}>
                      {book.price}
                    </div>
                  </div>
                  <button className="btn-teal" style={{ width: "100%", marginTop: 14, textAlign: "center" }}>
                    В корзину
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "90px 24px", background: "var(--teal)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--yellow)", fontFamily: "'Montserrat'", marginBottom: 14, fontWeight: 600 }}>
              ◆ &nbsp; Читатели о нас
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--yellow)" }}>
              Отзывы покупателей
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 20 }}>
            {REVIEWS.map((rev, i) => (
              <div key={i} style={{
                background: "rgba(245,240,168,0.08)",
                border: "1px solid rgba(245,240,168,0.25)",
                padding: "28px 24px",
              }}>
                <Stars n={rev.stars} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(245,240,168,0.9)", margin: "16px 0 22px", fontStyle: "italic" }}>
                  «{rev.text}»
                </p>
                <div style={{ borderTop: "1px solid rgba(245,240,168,0.2)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: "0.82rem", fontWeight: 600, color: "var(--yellow)" }}>
                    {rev.name}
                  </div>
                  <div style={{ fontFamily: "'Montserrat'", fontSize: "0.65rem", color: "rgba(245,240,168,0.4)", letterSpacing: "0.08em" }}>
                    {rev.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-yellow">
              Написать отзыв
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" style={{ padding: "90px 24px", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--teal)", fontFamily: "'Montserrat'", marginBottom: 14, fontWeight: 600 }}>
              ◆ &nbsp; Мы рядом
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: "var(--dark)" }}>
              Контакты
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}
            className="grid-cols-1 md:grid-cols-2">

            {/* Info */}
            <div>
              {[
                { icon: "MapPin", title: "Адрес", text: "Якушева д.3" },
                { icon: "Globe", title: "Сайт", text: "scarabuk.ru" },
                { icon: "Phone", title: "Телефон", text: "8 999 878-65-43" },
                { icon: "Clock", title: "Время работы", text: "Пн–Вс: 9:00 – 20:00" },
              ].map(({ icon, title, text }) => (
                <div key={title} style={{ display: "flex", gap: 18, marginBottom: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={icon} size={18} color="var(--yellow)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat'", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 5, fontWeight: 600 }}>{title}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "var(--dark)", lineHeight: 1.5 }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background: "var(--teal)", padding: "40px 36px", borderBottom: "5px solid var(--yellow)" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 400, color: "var(--yellow)", marginBottom: 6 }}>
                Задайте вопрос
              </h3>
              <p style={{ fontFamily: "'Montserrat'", fontSize: "0.78rem", color: "rgba(245,240,168,0.55)", marginBottom: 28 }}>
                Ответим в течение рабочего дня
              </p>
              {[
                { label: "Ваше имя", placeholder: "Иван Петров" },
                { label: "Телефон", placeholder: "8 999 000-00-00" },
              ].map(({ label, placeholder }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "'Montserrat'", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,168,0.55)", display: "block", marginBottom: 7 }}>
                    {label}
                  </label>
                  <input style={{
                    width: "100%", background: "rgba(245,240,168,0.1)",
                    border: "1px solid rgba(245,240,168,0.3)",
                    padding: "11px 14px", color: "var(--yellow)",
                    fontFamily: "'Montserrat'", fontSize: "0.88rem",
                    outline: "none", boxSizing: "border-box",
                  }} placeholder={placeholder} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "'Montserrat'", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,168,0.55)", display: "block", marginBottom: 7 }}>
                  Сообщение
                </label>
                <textarea style={{
                  width: "100%", background: "rgba(245,240,168,0.1)",
                  border: "1px solid rgba(245,240,168,0.3)",
                  padding: "11px 14px", color: "var(--yellow)",
                  fontFamily: "'Montserrat'", fontSize: "0.88rem",
                  outline: "none", resize: "vertical", minHeight: 90, boxSizing: "border-box",
                }} placeholder="Ваш вопрос..." />
              </div>
              <button className="btn-yellow" style={{ width: "100%", textAlign: "center" }}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--dark)", padding: "32px 24px", borderTop: "3px solid var(--teal)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--yellow)" }}>СКАРАБУК</div>
            <div style={{ fontFamily: "'Montserrat'", fontSize: "0.62rem", color: "rgba(245,240,168,0.3)", marginTop: 3, letterSpacing: "0.1em" }}>© 2026 · Книжный магазин · Якушева д.3</div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Montserrat'", fontSize: "0.68rem", letterSpacing: "0.08em",
                textTransform: "uppercase", color: "rgba(245,240,168,0.4)",
                transition: "color 0.2s",
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}