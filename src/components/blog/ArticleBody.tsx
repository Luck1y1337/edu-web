const ArticleBody = () => {
  return (
    <div className="article-body prose prose-gray max-w-none">
      <p>
        Dasturchilik bugungi kunda eng tezkor o'sayotgan kasblardan biridir.
        Ammo yangi boshlovchilar ko'pincha "qaerdan boshlash kerak?", "qaysi
        tilni o'rganish?", "qancha vaqt ketadi?" kabi savollarga duch keladilar.
        Bu maqolada barcha savollaringizga aniq javob beraman.
      </p>

      <h2 id="why-programming">Nima uchun dasturchilik?</h2>
      <p>
        2026-yilda dasturchi ish topish ehtimoli juda yuqori — O'zbekistondagi
        IT bozori har yili 35% o'sib bormoqda. Bundan tashqari, dasturchining
        o'rtacha maoshi boshqa kasblarga nisbatan 3-5 baravar yuqori. Va eng
        muhimi — siz remote (uydan turib) ham ishlay olasiz.
      </p>

      <blockquote>
        <p>
          "Dasturchilik bu nafaqat kasb — bu yo'l. Har kuni yangi narsa
          o'rganishni tan oluvchilar uchun mukammal kasb."
        </p>
        <cite>— Akmal Karimov</cite>
      </blockquote>

      <h2 id="which-direction">Qaysi yo'nalishni tanlash?</h2>
      <p>Bu eng birinchi va eng muhim qaror. Asosiy yo'nalishlar:</p>
      <ul>
        <li>
          <strong>Frontend</strong> — saytlarning ko'rinadigan qismi.
          JavaScript, React, CSS.
        </li>
        <li>
          <strong>Backend</strong> — sayt va ilovaning ichki ishlashi. Python,
          Node.js, Java.
        </li>
        <li>
          <strong>Fullstack</strong> — ikkalasi ham. Yaxshi tajriba kerak.
        </li>
        <li>
          <strong>Mobil</strong> — telefonlar uchun ilovalar. Flutter, React
          Native, Swift.
        </li>
        <li>
          <strong>Data Science</strong> — ma'lumotlar bilan ishlash, ML.
          Python, SQL.
        </li>
      </ul>
      <p>
        Yangi boshlovchilar uchun Frontend eng yaxshi yo'l deb hisoblayman —
        natijani darhol ko'rasiz, motivatsiya yo'qolmaydi.
      </p>

      <h2 id="learning-path">O'rganish yo'li</h2>

      <h3>1-bosqich: Asoslar (1-2 oy)</h3>
      <p>
        HTML va CSS bilan boshlang. Bu sizga web qanday ishlashini tushunish
        imkonini beradi. Asoslarni o'rganganingizdan keyin JavaScript'ga o'ting.
      </p>

      <h3>2-bosqich: JavaScript (3-4 oy)</h3>
      <p>
        JavaScript — bu zamonaviy web-ning yuragi. Asoslar, DOM, asinxronlik,
        ES6+ va Fetch API'ni puxta o'rganing.
      </p>

      <h3>3-bosqich: Framework (2-3 oy)</h3>
      <p>
        React yoki Vue.js tanlang. React keng tarqalgan va ish topish osonroq.
        Komponentlar, Hooks va Router'ni o'rganing.
      </p>

      <h3>4-bosqich: Loyihalar (3-6 oy)</h3>
      <p>
        Endi siz portfolio yaratishni boshlashingiz kerak. Kamida 3-5 ta real
        loyiha qiling: ToDo ilova, blog, e-commerce sayt. GitHub'da chop eting.
      </p>

      <h2 id="career">Birinchi ishga qanday tayyorlanish?</h2>
      <ol>
        <li>
          <strong>Portfolio</strong> — GitHub va shaxsiy sayt. 3-5 ta sifatli
          loyiha bo'lsin.
        </li>
        <li>
          <strong>Rezyume</strong> — qisqa, aniq, natijaga yo'naltirilgan. 1-2
          sahifa.
        </li>
        <li>
          <strong>LinkedIn</strong> — IT sohada juda muhim. Faol bo'ling,
          postlar yozing.
        </li>
        <li>
          <strong>Tarmoq</strong> — IT meetup'lar, konferensiyalar. Boshqa
          dasturchilar bilan tanishing.
        </li>
        <li>
          <strong>Suhbatga tayyorgarlik</strong> — algoritm masalalari, system
          design. LeetCode'da mashq qiling.
        </li>
      </ol>

      <h2 id="conclusion">Xulosa</h2>
      <p>
        Dasturchi bo'lish 6-12 oy ichida mumkin. Ammo bu yo'lda muntazam
        ishlash, mashq qilish va sabr kerak. Eng muhimi — boshlang. Bugun.
        Hozir.
      </p>
      <p>
        Agar yordam kerak bo'lsa, bizning JavaScript dasturlash kursimizga
        yozilishingiz mumkin. Hammasi noldan boshlanadi va biz har bir
        qadamingizda yoningizdamiz.
      </p>
    </div>
  );
};

export default ArticleBody;
