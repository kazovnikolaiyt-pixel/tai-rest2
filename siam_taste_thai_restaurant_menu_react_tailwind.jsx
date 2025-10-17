import React, { useMemo, useState } from "react";

// --- Helper: smooth scroll for in-page anchors ---
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// --- Data ---
const CATEGORIES = [
  { key: "soups", label: "Супы" },
  { key: "mains", label: "Горячие блюда" },
  { key: "salads", label: "Салаты" },
  { key: "desserts", label: "Десерты" },
  { key: "drinks", label: "Напитки" },
];

const MENU_ITEMS = [
  // Soups
  {
    id: "tom-yum",
    category: "soups",
    name: "Том Ям",
    desc: "Кисло-острый суп с креветками, лемонграссом и галангалом",
    price: 590,
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
    spicy: 3,
    badge: "Хит",
  },
  {
    id: "tom-kha",
    category: "soups",
    name: "Том Кха Гай",
    desc: "Кокосовый суп с курицей, галангалом и лаймом",
    price: 540,
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    spicy: 1,
  },
  // Mains
  {
    id: "pad-thai",
    category: "mains",
    name: "Пад Тай",
    desc: "Рисовая лапша с креветками, тамариндом, арахисом и лаймом",
    price: 690,
    img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    spicy: 1,
    badge: "Рекомендуем",
  },
  {
    id: "green-curry",
    category: "mains",
    name: "Зелёное карри",
    desc: "Ароматное карри с кокосовым молоком, тайским базиликом и овощами",
    price: 720,
    img: "https://images.unsplash.com/photo-1604908176997-431664c7a3bb?q=80&w=1200&auto=format&fit=crop",
    spicy: 4,
  },
  {
    id: "massaman",
    category: "mains",
    name: "Массаман карри",
    desc: "Нежное карри с картофелем, арахисом и пряностями юга Таиланда",
    price: 740,
    img: "https://images.unsplash.com/photo-1674570870688-104c3b3f3ed5?q=80&w=1200&auto=format&fit=crop",
    spicy: 2,
  },
  // Salads
  {
    id: "som-tam",
    category: "salads",
    name: "Сом Там",
    desc: "Хрустящий салат из зелёной папайи, лайма и чили",
    price: 490,
    img: "https://images.unsplash.com/photo-1583577612013-4fecf0c01b42?q=80&w=1200&auto=format&fit=crop",
    spicy: 3,
  },
  {
    id: "larb-gai",
    category: "salads",
    name: "Ларб Гай",
    desc: "Тёплый салат из курицы с мятой, рисовой крошкой и лаймом",
    price: 520,
    img: "https://images.unsplash.com/photo-1576869644476-c47fcf8d1417?q=80&w=1200&auto=format&fit=crop",
    spicy: 2,
  },
  // Desserts
  {
    id: "mango-sticky",
    category: "desserts",
    name: "Манго со сладким рисом",
    desc: "Кокосовый клейкий рис, спелый манго и кунжут",
    price: 450,
    img: "https://images.unsplash.com/photo-1632893751580-563f3fa50bd8?q=80&w=1200&auto=format&fit=crop",
    spicy: 0,
  },
  {
    id: "banana-rove",
    category: "desserts",
    name: "Жарёные бананы",
    desc: "Хрустящие банановые ломтики с карамелью и кокосом",
    price: 390,
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    spicy: 0,
  },
  // Drinks
  {
    id: "thai-tea",
    category: "drinks",
    name: "Тайский чай",
    desc: "Черный чай с пряностями и сгущённым молоком со льдом",
    price: 290,
    img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1200&auto=format&fit=crop",
    spicy: 0,
  },
  {
    id: "lemongrass-limeade",
    category: "drinks",
    name: "Лемонграсс-лайм",
    desc: "Освежающий лимонад с лемонграссом и лаймом",
    price: 270,
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
    spicy: 0,
  },
];

function SpicyDots({ level = 0 }) {
  return (
    <div className="flex gap-1" aria-label={`Острота: ${level} из 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={
            "inline-block h-2 w-2 rounded-full " +
            (i < level ? "bg-red-700" : "bg-red-200")
          }
        />
      ))}
    </div>
  );
}

function MenuCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-red-100 bg-white shadow-sm transition hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-white shadow">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold text-red-900">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
            {item.price.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <p className="text-sm text-red-900/70">{item.desc}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-red-800/70">Острота</span>
          <SpicyDots level={item.spicy} />
        </div>
      </div>
    </div>
  );
}

export default function SiamTastePage() {
  const [active, setActive] = useState("soups");
  const filtered = useMemo(
    () => MENU_ITEMS.filter((m) => m.category === active),
    [active]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50 text-red-900">
      {/* Page wrapper */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@500;700&family=Inter:wght@400;600;700&display=swap');
        .font-heading { font-family: 'Noto Serif Thai', ui-serif, Georgia, 'Times New Roman', serif; }
        .font-body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, 'Noto Sans', 'Helvetica Neue', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-amber-200/60 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-red-700 text-white shadow">
              <span className="font-heading text-xl">S</span>
            </div>
            <div>
              <div className="font-heading text-xl font-bold tracking-wide text-red-900">
                Siam Taste
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-red-800/70">
                Authentic Thai Cuisine
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex font-body">
            <button onClick={() => scrollToId('home')} className="text-sm font-semibold text-red-900/80 hover:text-red-900">Главная</button>
            <button onClick={() => scrollToId('menu')} className="text-sm font-semibold text-red-900/80 hover:text-red-900">Меню</button>
            <button onClick={() => scrollToId('about')} className="text-sm font-semibold text-red-900/80 hover:text-red-900">О нас</button>
            <button onClick={() => scrollToId('contacts')} className="text-sm font-semibold text-red-900/80 hover:text-red-900">Контакты</button>
          </nav>

          <button
            onClick={() => scrollToId('booking')}
            className="rounded-2xl bg-gradient-to-r from-amber-500 to-red-600 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:brightness-110"
          >
            Забронировать столик
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
            alt="Тайские блюда"
            className="h-[60vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white/0" />
        </div>
        <div className="mx-auto flex h-[60vh] max-w-6xl flex-col items-start justify-center px-4">
          <h1 className="font-heading text-4xl font-extrabold text-white drop-shadow md:text-5xl">
            Вкус Таиланда в самом сердце города
          </h1>
          <p className="mt-4 max-w-xl font-body text-white/90 md:text-lg">
            Аутентичные рецепты, свежие ингредиенты и тёплое гостеприимство.
          </p>
          <div className="mt-8">
            <button
              onClick={() => scrollToId('menu')}
              className="rounded-2xl bg-amber-500/95 px-6 py-3 font-body text-sm font-bold text-white shadow-lg backdrop-blur transition hover:translate-y-[-1px] hover:brightness-110"
            >
              Посмотреть меню
            </button>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-red-900 md:text-4xl">Меню</h2>
            <p className="font-body text-red-900/70">Выберите категорию и найдите своё любимое блюдо</p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-10 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => {
            const activeCat = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={
                  "rounded-full border px-4 py-2 text-sm font-semibold transition " +
                  (activeCat
                    ? "border-amber-500 bg-amber-500 text-white shadow"
                    : "border-amber-200 bg-white text-red-900 hover:border-amber-400 hover:bg-amber-50")
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white/70 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1600&auto=format&fit=crop"
              alt="Шеф-повар тайской кухни"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-amber-500/20" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-red-900 md:text-4xl">О нас</h2>
            <p className="mt-4 font-body leading-relaxed text-red-900/80">
              В <span className="font-semibold">Siam Taste</span> мы бережно сохраняем традиции тайской кухни: баланс
              кисло-сладко-острых нот, свежесть трав и пряностей, уважение к продукту.
              Мы работаем только со свежими ингредиентами и готовим блюда à la minute, чтобы вы почувствовали
              атмосферу уличных рынков Бангкока и уют домашних рецептов.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 text-sm text-red-900/80">
              <li className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">Свежие травы и специи</li>
              <li className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">Аутентичные рецепты</li>
              <li className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">Вегетарианские опции</li>
              <li className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">Острые и мягкие блюда</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-red-900 md:text-4xl">Контакты</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-amber-100">
            <h3 className="font-heading text-xl font-semibold">Siam Taste — Authentic Thai Cuisine</h3>
            <div className="mt-4 space-y-2 font-body text-red-900/80">
              <p><span className="font-semibold">Адрес:</span> ул. Пряностей, 7</p>
              <p><span className="font-semibold">Телефон:</span> +7 (999) 123-45-67</p>
              <p><span className="font-semibold">Время работы:</span> Ежедневно 12:00–23:00</p>
            </div>
            <div id="booking" className="mt-6">
              <button
                onClick={() => alert('Спасибо! Мы свяжемся для подтверждения брони.')}
                className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-red-600 px-5 py-3 font-body text-sm font-bold text-white shadow-md transition hover:brightness-110"
              >
                Забронировать столик
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow ring-1 ring-amber-100">
            {/* Replace src with your real Google Maps embed link */}
            <iframe
              title="Карта"
              src="https://maps.google.com/maps?q=Bangkok&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200/60 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="font-body text-sm text-red-900/70">© {new Date().getFullYear()} Siam Taste. Все права защищены.</p>
          <div className="flex gap-4 text-sm text-red-900/70">
            <button onClick={() => scrollToId('home')} className="hover:text-red-900">Главная</button>
            <button onClick={() => scrollToId('menu')} className="hover:text-red-900">Меню</button>
            <button onClick={() => scrollToId('about')} className="hover:text-red-900">О нас</button>
            <button onClick={() => scrollToId('contacts')} className="hover:text-red-900">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
