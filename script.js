// ============================================================
// NOUR AGRI AI
// SMART FARMING ASSISTANT
// Owner & Creator: MUHAMMAD LAMINU
// ============================================================

"use strict";

// ============================================================
// APP CONFIGURATION
// ============================================================

const APP = {
  name: "NOUR AGRI AI",
  subtitle: "Smart Farming Assistant",
  owner: "Muhammad Laminu",
  version: "1.0.0"
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function getElement(id) {
  return document.getElementById(id);
}

function showElement(element) {
  if (element) element.style.display = "";
}

function hideElement(element) {
  if (element) element.style.display = "none";
}

// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

// ============================================================
// INITIALIZE APP
// ============================================================

function initializeApp() {
  console.log("========================================");
  console.log("NOUR AGRI AI");
  console.log("Owner & Creator: Muhammad Laminu");
  console.log("Version:", APP.version);
  console.log("========================================");

  initializeLoader();
  initializeNavigation();
  initializeMobileMenu();
  initializeAI();
  initializeCropSearch();
  initializeFertilizerCalculator();
  initializeFarmRecords();
  initializeNotifications();
  initializeProfile();
  initializeStats();
  initializeWeather();
  initializeToast();
  initializeOnlineStatus();
  initializeKeyboardShortcuts();
  registerServiceWorker();
  displayOwnerName();
}

// ============================================================
// OWNER NAME
// ============================================================

function displayOwnerName() {
  const ownerElements = document.querySelectorAll(
    ".owner-name, [data-owner], #ownerName"
  );

  ownerElements.forEach((element) => {
    element.textContent = APP.owner;
  });
}

// ============================================================
// LOADER
// ============================================================

function initializeLoader() {
  const loader = getElement("appLoader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 400);
  }, 700);
}

// ============================================================
// NAVIGATION
// ============================================================

function initializeNavigation() {
  const navItems = $$(".nav-item");
  const pages = $$(".page");

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const page =
        item.dataset.page ||
        item.getAttribute("href")?.replace("#", "");

      if (page) {
        navigateTo(page);
      }
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-page]");

    if (!target) return;

    const page = target.dataset.page;

    if (page) {
      event.preventDefault();
      navigateTo(page);
    }
  });

  function setInitialPage() {
    const hash = window.location.hash.replace("#", "");

    if (hash) {
      navigateTo(hash, false);
    } else {
      navigateTo("home", false);
    }
  }

  setInitialPage();

  window.addEventListener("hashchange", () => {
    const page = window.location.hash.replace("#", "");

    if (page) {
      navigateTo(page, false);
    }
  });
}

function navigateTo(pageName, updateHash = true) {
  const pages = $$(".page");
  const navItems = $$(".nav-item");

  let found = false;

  pages.forEach((page) => {
    const id = page.id;

    if (
      id === pageName ||
      id === `${pageName}Page` ||
      id === `page-${pageName}`
    ) {
      page.classList.add("active");
      found = true;
    } else {
      page.classList.remove("active");
    }
  });

  navItems.forEach((item) => {
    const itemPage =
      item.dataset.page ||
      item.getAttribute("href")?.replace("#", "");

    item.classList.toggle(
      "active",
      itemPage === pageName
    );
  });

  if (!found) {
    const home = getElement("home");

    if (home) {
      pages.forEach((page) => page.classList.remove("active"));
      home.classList.add("active");
    }
  }

  if (updateHash) {
    history.replaceState(null, "", `#${pageName}`);
  }

  closeMobileSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ============================================================
// MOBILE MENU
// ============================================================

function initializeMobileMenu() {
  const menuButton = getElement("menuButton");
  const sidebar = getElement("sidebar");

  if (!menuButton || !sidebar) return;

  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMobileSidebar();
    }
  });
}

function closeMobileSidebar() {
  const sidebar = getElement("sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }
}

// ============================================================
// AGRICULTURE KNOWLEDGE DATABASE
// ============================================================

const AGRI_KNOWLEDGE = {

  // ----------------------------------------------------------
  // MAIZE
  // ----------------------------------------------------------

  maize: {
    keywords: [
      "maize",
      "corn",
      "masara"
    ],

    title: "🌽 MAIZE FARMING GUIDE",

    answer: `
      <h3>🌽 Maize Farming Guide</h3>

      <p>
        Maize is an important cereal crop used for food, animal feed
        and many processed products. Good management from land
        preparation to storage can improve yield and reduce losses.
      </p>

      <h4>1. 🌱 Soil Preparation</h4>

      <p>
        Prepare the land by removing unwanted vegetation and breaking
        large soil clods. Maize generally performs well in fertile,
        well-drained soil. Avoid fields where water remains stagnant
        for long periods.
      </p>

      <h4>2. 🌾 Seed Selection</h4>

      <p>
        Use healthy, quality seed that is suitable for your local
        environment. Avoid damaged, mouldy or very old seed.
        Improved varieties may offer better yield or disease resistance,
        depending on the variety and location.
      </p>

      <h4>3. 🌱 Planting</h4>

      <p>
        Plant when soil moisture is suitable and rainfall conditions
        are favourable. Avoid planting into extremely dry soil or
        poorly drained waterlogged areas.
      </p>

      <h4>4. 🌿 Spacing</h4>

      <p>
        Proper spacing helps plants receive enough sunlight, water
        and nutrients. The exact spacing depends on the maize variety,
        production system and local extension recommendations.
      </p>

      <h4>5. 🧪 Fertilizer</h4>

      <p>
        Maize needs important nutrients, especially nitrogen, phosphorus
        and potassium. Fertilizer requirements should ideally be based
        on soil testing and local agricultural recommendations.
      </p>

      <h4>6. 💧 Water Management</h4>

      <p>
        Keep the crop supplied with adequate moisture, especially during
        important growth stages such as establishment, flowering and
        grain development. Avoid both severe drought stress and
        prolonged waterlogging.
      </p>

      <h4>7. 🌿 Weed Control</h4>

      <p>
        Control weeds early because young maize plants compete poorly
        with aggressive weeds. Hand weeding, suitable cultivation
        practices and locally recommended weed-management methods can
        be used.
      </p>

      <h4>8. 🐛 Pest and Disease Monitoring</h4>

      <p>
        Regularly inspect leaves, stems and growing points for insects,
        feeding damage or disease symptoms. Early identification makes
        management easier.
      </p>

      <h4>9. 🌽 Harvesting</h4>

      <p>
        Harvest when the ears and grains have reached the appropriate
        maturity for your intended use. For grain storage, moisture
        must be reduced sufficiently before long-term storage.
      </p>

      <h4>10. 📦 Storage</h4>

      <p>
        Store properly dried maize in a clean, dry and protected place.
        Protect stored grain from insects, rodents, moisture and mould.
      </p>

      <h4>👨‍🌾 Farmer Tip</h4>

      <p>
        Do not focus only on fertilizer. Good seed, correct planting,
        weed management, adequate moisture, pest monitoring and proper
        storage all contribute to successful maize production.
      </p>
    `
  },

  // ----------------------------------------------------------
  // RICE
  // ----------------------------------------------------------

  rice: {
    keywords: [
      "rice",
      "shinkafa"
    ],

    title: "🌾 RICE FARMING GUIDE",

    answer: `
      <h3>🌾 Rice Farming Guide</h3>

      <p>
        Rice requires careful water, nutrient and weed management.
        Production methods vary between lowland, upland and irrigated
        systems.
      </p>

      <h4>1. Soil and Land Preparation</h4>

      <p>
        Prepare a suitable field with good soil condition. Lowland rice
        fields may require proper levelling and water management.
      </p>

      <h4>2. Seed Selection</h4>

      <p>
        Choose quality rice seed suited to your production environment.
        Consider maturity period, disease resistance and expected market
        demand.
      </p>

      <h4>3. Planting</h4>

      <p>
        Rice can be established through direct seeding or transplanting,
        depending on the farming system. Use healthy seedlings when
        transplanting.
      </p>

      <h4>4. Water Management</h4>

      <p>
        Water requirements depend on the production system. Maintain
        appropriate moisture and avoid uncontrolled water loss.
      </p>

      <h4>5. Weed Control</h4>

      <p>
        Weed competition can seriously reduce rice performance.
        Control weeds early using locally suitable methods.
      </p>

      <h4>6. Fertilizer</h4>

      <p>
        Rice needs balanced nutrients. Soil testing and local extension
        recommendations are useful for deciding fertilizer requirements.
      </p>

      <h4>7. Pest and Disease Monitoring</h4>

      <p>
        Inspect plants regularly for insects, leaf damage, discoloration
        and other unusual symptoms.
      </p>

      <h4>8. Harvesting</h4>

      <p>
        Harvest when grains reach suitable maturity. Delayed harvesting
        can increase field losses under some conditions.
      </p>

      <h4>9. Drying</h4>

      <p>
        Dry harvested grain properly before storage. Moist grain is more
        likely to develop mould and spoilage.
      </p>

      <h4>10. Storage</h4>

      <p>
        Keep rice in clean, dry and protected storage and regularly check
        for insects and moisture.
      </p>
    `
  },

  // ----------------------------------------------------------
  // TOMATO
  // ----------------------------------------------------------

  tomato: {
    keywords: [
      "tomato",
      "tumatir"
    ],

    title: "🍅 TOMATO FARMING GUIDE",

    answer: `
      <h3>🍅 Tomato Farming Guide</h3>

      <p>
        Tomato can be profitable when farmers manage nursery production,
        transplanting, water, nutrients, pests and diseases carefully.
      </p>

      <h4>1. Nursery</h4>

      <p>
        Start with healthy seed and a clean nursery environment.
        Protect young seedlings from excessive rain, pests and disease.
      </p>

      <h4>2. Transplanting</h4>

      <p>
        Transplant strong seedlings after they have developed sufficiently
        and field conditions are suitable. Handle roots carefully.
      </p>

      <h4>3. Soil</h4>

      <p>
        Tomato prefers fertile, well-drained soil. Avoid fields where
        water remains around the roots for long periods.
      </p>

      <h4>4. Water</h4>

      <p>
        Maintain consistent moisture. Irregular watering can contribute
        to plant stress and fruit-quality problems.
      </p>

      <h4>5. Fertilizer</h4>

      <p>
        Tomato requires balanced nutrition. Use soil-test information
        and local recommendations when selecting fertilizer.
      </p>

      <h4>6. Support</h4>

      <p>
        Some tomato varieties benefit from staking or other support.
        Support can help keep fruit away from the soil.
      </p>

      <h4>7. Pest Monitoring</h4>

      <p>
        Check leaves, flowers and fruits regularly for insects and feeding
        damage. Remove severely affected plant material where appropriate.
      </p>

      <h4>8. Disease Monitoring</h4>

      <p>
        Watch for unusual spots, wilting, leaf yellowing and fruit
        problems. Good sanitation and airflow can reduce some disease
        pressure.
      </p>

      <h4>9. Harvest</h4>

      <p>
        Harvest according to the intended market. Handle fruits gently
        to reduce bruising.
      </p>

      <h4>10. Marketing</h4>

      <p>
        Plan harvest and sales carefully because fresh tomatoes are
        perishable. Good packaging and quick movement to market can
        reduce losses.
      </p>
    `
  },

  // ----------------------------------------------------------
  // PEPPER
  // ----------------------------------------------------------

  pepper: {
    keywords: [
      "pepper",
      "barkono",
      "chilli",
      "chili"
    ],

    title: "🌶️ PEPPER FARMING GUIDE",

    answer: `
      <h3>🌶️ Pepper Farming Guide</h3>

      <p>
        Pepper grows best when farmers provide suitable soil, adequate
        moisture, balanced nutrients and regular pest monitoring.
      </p>

      <h4>1. Seed</h4>
      <p>
        Choose quality seed from a reliable source and select a variety
        suitable for your local conditions.
      </p>

      <h4>2. Nursery</h4>
      <p>
        Raise healthy seedlings in a clean nursery with sufficient light
        and appropriate moisture.
      </p>

      <h4>3. Transplanting</h4>
      <p>
        Move healthy seedlings carefully to prepared beds or fields.
        Avoid damaging the roots.
      </p>

      <h4>4. Water</h4>
      <p>
        Keep soil moisture reasonably consistent and avoid prolonged
        waterlogging.
      </p>

      <h4>5. Fertilizer</h4>
      <p>
        Use balanced nutrition according to soil condition and local
        recommendations.
      </p>

      <h4>6. Weed Control</h4>
      <p>
        Control weeds before they become strong competitors for water,
        nutrients and sunlight.
      </p>

      <h4>7. Pest Monitoring</h4>
      <p>
        Inspect leaves and growing points frequently for insect damage.
      </p>

      <h4>8. Harvest</h4>
      <p>
        Harvest according to the variety and market requirement.
        Handle peppers carefully to avoid unnecessary damage.
      </p>
    `
  },

  // ----------------------------------------------------------
  // BEANS
  // ----------------------------------------------------------

  beans: {
    keywords: [
      "beans",
      "bean",
      "wake",
      "cowpea"
    ],

    title: "🫘 BEANS FARMING GUIDE",

    answer: `
      <h3>🫘 Beans Farming Guide</h3>

      <p>
        Beans and cowpea are important food and income crops. Good seed
        selection, weed control and pest monitoring are especially
        important.
      </p>

      <h4>1. Land Preparation</h4>
      <p>
        Prepare a clean, well-drained field suitable for the selected
        bean variety.
      </p>

      <h4>2. Seed Selection</h4>
      <p>
        Use healthy seed with good germination and choose varieties
        suitable for your area.
      </p>

      <h4>3. Planting</h4>
      <p>
        Plant when soil moisture and weather conditions are suitable.
        Follow recommended spacing for the selected variety.
      </p>

      <h4>4. Weed Control</h4>
      <p>
        Keep the field reasonably weed-free, especially during early
        crop establishment.
      </p>

      <h4>5. Pest Monitoring</h4>
      <p>
        Regularly inspect leaves, flowers and pods for insect damage.
      </p>

      <h4>6. Water</h4>
      <p>
        Avoid prolonged drought stress and waterlogging.
      </p>

      <h4>7. Harvest</h4>
      <p>
        Harvest at the correct stage for fresh consumption or dry grain
        production.
      </p>

      <h4>8. Storage</h4>
      <p>
        Dry beans properly and store them in clean, dry and protected
        conditions.
      </p>
    `
  },

  // ----------------------------------------------------------
  // GROUNDNUT
  // ----------------------------------------------------------

  groundnut: {
    keywords: [
      "groundnut",
      "groundnuts",
      "peanut",
      "peanuts",
      "gyada"
    ],

    title: "🥜 GROUNDNUT FARMING GUIDE",

    answer: `
      <h3>🥜 Groundnut Farming Guide</h3>

      <p>
        Groundnut develops pods underground, so soil condition and
        moisture management are very important.
      </p>

      <h4>1. Soil</h4>
      <p>
        Use well-drained soil that allows pods to develop properly.
      </p>

      <h4>2. Seed</h4>
      <p>
        Select healthy, high-quality seed from a reliable source.
      </p>

      <h4>3. Planting</h4>
      <p>
        Plant under suitable moisture conditions and use locally
        recommended spacing.
      </p>

      <h4>4. Weed Management</h4>
      <p>
        Control weeds early because competition can reduce crop growth
        and yield.
      </p>

      <h4>5. Nutrients</h4>
      <p>
        Maintain balanced soil fertility. Soil testing can help identify
        nutrient requirements.
      </p>

      <h4>6. Disease Monitoring</h4>
      <p>
        Watch leaves for unusual spots or premature yellowing and seek
        local agricultural advice when symptoms appear.
      </p>

      <h4>7. Harvest</h4>
      <p>
        Harvest when pods have reached appropriate maturity. Avoid
        leaving mature pods in the field unnecessarily.
      </p>

      <h4>8. Drying and Storage</h4>
      <p>
        Dry properly before storage and protect the crop from moisture,
        insects and mould.
      </p>
    `
  },

  // ----------------------------------------------------------
  // CASSAVA
  // ----------------------------------------------------------

  cassava: {
    keywords: [
      "cassava",
      "rogo"
    ],

    title: "🥔 CASSAVA FARMING GUIDE",

    answer: `
      <h3>🥔 Cassava Farming Guide</h3>

      <p>
        Cassava is a major root crop that can tolerate some difficult
        conditions, but good planting material, weed management and
        disease monitoring remain important.
      </p>

      <h4>1. Planting Material</h4>
      <p>
        Use healthy stems from vigorous plants and avoid visibly diseased
        planting material.
      </p>

      <h4>2. Soil Preparation</h4>
      <p>
        Prepare suitable soil and ensure adequate drainage.
      </p>

      <h4>3. Planting</h4>
      <p>
        Plant healthy stem cuttings under suitable soil moisture
        conditions.
      </p>

      <h4>4. Weed Control</h4>
      <p>
        Control weeds especially during early establishment.
      </p>

      <h4>5. Nutrients</h4>
      <p>
        Maintain soil fertility using locally recommended practices.
      </p>

      <h4>6. Disease Monitoring</h4>
      <p>
        Watch for unusual leaf symptoms and poor plant growth.
      </p>

      <h4>7. Harvesting</h4>
      <p>
        Harvest according to variety and intended use.
      </p>

      <h4>8. Post-Harvest</h4>
      <p>
        Process or market harvested roots promptly because fresh cassava
        roots deteriorate after harvest.
      </p>
    `
  },

  // ----------------------------------------------------------
  // YAM
  // ----------------------------------------------------------

  yam: {
    keywords: [
      "yam",
      "doya"
    ],

    title: "🍠 YAM FARMING GUIDE",

    answer: `
      <h3>🍠 Yam Farming Guide</h3>

      <p>
        Yam production requires good planting material, suitable soil,
        adequate moisture and proper weed management.
      </p>

      <h4>1. Land Preparation</h4>
      <p>
        Prepare suitable mounds or ridges according to the local
        production system.
      </p>

      <h4>2. Seed Yam</h4>
      <p>
        Use healthy planting material and avoid visibly diseased tubers.
      </p>

      <h4>3. Planting</h4>
      <p>
        Plant at a suitable time when soil moisture conditions are good.
      </p>

      <h4>4. Weeding</h4>
      <p>
        Keep young yam plants free from heavy weed competition.
      </p>

      <h4>5. Staking</h4>
      <p>
        Many yam varieties benefit from staking because vines need
        support for good growth.
      </p>

      <h4>6. Soil Fertility</h4>
      <p>
        Maintain good soil fertility using appropriate organic matter
        and locally recommended fertilizer practices.
      </p>

      <h4>7. Harvesting</h4>
      <p>
        Harvest when tubers have reached the appropriate maturity.
        Minimize cuts and bruises during digging.
      </p>

      <h4>8. Storage</h4>
      <p>
        Keep tubers in a suitable, dry and ventilated storage environment
        and inspect them regularly.
      </p>
    `
  },

  // ----------------------------------------------------------
  // ONION
  // ----------------------------------------------------------

  onion: {
    keywords: [
      "onion",
      "albasa"
    ],

    title: "🧅 ONION FARMING GUIDE",

    answer: `
      <h3>🧅 Onion Farming Guide</h3>

      <p>
        Onion production requires good nursery management, soil drainage,
        appropriate irrigation and careful harvesting.
      </p>

      <h4>1. Nursery</h4>
      <p>
        Use healthy seed and maintain a clean nursery with suitable
        moisture.
      </p>

      <h4>2. Transplanting</h4>
      <p>
        Transplant healthy seedlings carefully and avoid damaging roots.
      </p>

      <h4>3. Soil</h4>
      <p>
        Onion performs well in fertile, well-drained soil.
      </p>

      <h4>4. Irrigation</h4>
      <p>
        Maintain suitable moisture without keeping the soil excessively
        wet.
      </p>

      <h4>5. Weeding</h4>
      <p>
        Onion has relatively weak competition against weeds, so weed
        management is important.
      </p>

      <h4>6. Fertilizer</h4>
      <p>
        Use nutrient recommendations based on soil condition and local
        agricultural advice.
      </p>

      <h4>7. Harvesting</h4>
      <p>
        Harvest when bulbs are mature and tops begin showing appropriate
        maturity signs.
      </p>

      <h4>8. Storage</h4>
      <p>
        Cure and dry bulbs properly before storage. Store in a dry,
        ventilated environment.
      </p>
    `
  },

  // ----------------------------------------------------------
  // CABBAGE
  // ----------------------------------------------------------

  cabbage: {
    keywords: [
      "cabbage",
      "kabeji"
    ],

    title: "🥬 CABBAGE FARMING GUIDE",

    answer: `
      <h3>🥬 Cabbage Farming Guide</h3>

      <p>
        Cabbage requires fertile soil, sufficient moisture and careful
        monitoring for insects and diseases.
      </p>

      <h4>1. Nursery</h4>
      <p>
        Raise healthy seedlings in a clean nursery.
      </p>

      <h4>2. Transplanting</h4>
      <p>
        Transplant strong seedlings into prepared soil while avoiding
        root damage.
      </p>

      <h4>3. Water</h4>
      <p>
        Maintain adequate and consistent soil moisture.
      </p>

      <h4>4. Fertility</h4>
      <p>
        Cabbage needs good nutrition. Use soil information and local
        recommendations to guide fertilizer use.
      </p>

      <h4>5. Pest Monitoring</h4>
      <p>
        Inspect leaves frequently for caterpillars and other feeding
        damage.
      </p>

      <h4>6. Harvest</h4>
      <p>
        Harvest firm heads at the desired market size and handle them
        carefully.
      </p>
    `
  },

  // ----------------------------------------------------------
  // CARROT
  // ----------------------------------------------------------

  carrot: {
    keywords: [
      "carrot",
      "karas"
    ],

    title: "🥕 CARROT FARMING GUIDE",

    answer: `
      <h3>🥕 Carrot Farming Guide</h3>

      <p>
        Carrots need loose, well-drained soil because the edible root
        develops underground.
      </p>

      <h4>1. Soil</h4>
      <p>
        Use loose soil without large stones or hard layers.
      </p>

      <h4>2. Seed</h4>
      <p>
        Use quality seed with good germination.
      </p>

      <h4>3. Planting</h4>
      <p>
        Sow seed carefully and avoid excessive crowding.
      </p>

      <h4>4. Water</h4>
      <p>
        Keep moisture reasonably consistent during root development.
      </p>

      <h4>5. Weeding</h4>
      <p>
        Remove weeds carefully because young carrot plants can be easily
        outcompeted.
      </p>

      <h4>6. Harvest</h4>
      <p>
        Harvest when roots have reached the desired size and quality.
      </p>
    `
  },

  // ----------------------------------------------------------
  // CUCUMBER
  // ----------------------------------------------------------

  cucumber: {
    keywords: [
      "cucumber",
      "kokumba"
    ],

    title: "🥒 CUCUMBER FARMING GUIDE",

    answer: `
      <h3>🥒 Cucumber Farming Guide</h3>

      <p>
        Cucumber grows quickly and needs adequate moisture, nutrients,
        sunlight and pest monitoring.
      </p>

      <h4>1. Soil</h4>
      <p>
        Use fertile, well-drained soil.
      </p>

      <h4>2. Planting</h4>
      <p>
        Plant quality seed under suitable moisture conditions.
      </p>

      <h4>3. Water</h4>
      <p>
        Maintain adequate moisture, especially during flowering and
        fruit development.
      </p>

      <h4>4. Support</h4>
      <p>
        Trellising can help some cucumber production systems improve
        airflow and fruit handling.
      </p>

      <h4>5. Pest Monitoring</h4>
      <p>
        Inspect leaves and fruits frequently.
      </p>

      <h4>6. Harvest</h4>
      <p>
        Harvest regularly at the desired size because over-mature
        fruits may reduce market quality.
      </p>
    `
  },

  // ----------------------------------------------------------
  // OKRA
  // ----------------------------------------------------------

  okra: {
    keywords: [
      "okra",
      "kubewa"
    ],

    title: "🌿 OKRA FARMING GUIDE",

    answer: `
      <h3>🌿 Okra Farming Guide</h3>

      <p>
        Okra is a warm-season vegetable that can provide repeated harvests
        when managed properly.
      </p>

      <h4>1. Soil</h4>
      <p>
        Use fertile, well-drained soil.
      </p>

      <h4>2. Seed</h4>
      <p>
        Choose healthy seed from a reliable source.
      </p>

      <h4>3. Planting</h4>
      <p>
        Plant when temperature and moisture conditions are appropriate.
      </p>

      <h4>4. Weed Control</h4>
      <p>
        Control weeds during early growth.
      </p>

      <h4>5. Water</h4>
      <p>
        Provide sufficient moisture, especially during fruit development.
      </p>

      <h4>6. Harvest</h4>
      <p>
        Harvest young pods regularly to maintain good quality.
      </p>
    `
  },

  // ----------------------------------------------------------
  // SPINACH
  // ----------------------------------------------------------

  spinach: {
    keywords: [
      "spinach",
      "alayyahu"
    ],

    title: "🥬 SPINACH / LEAFY VEGETABLE GUIDE",

    answer: `
      <h3>🥬 Leafy Vegetable Farming Guide</h3>

      <p>
        Leafy vegetables grow quickly and need fertile soil, adequate
        moisture and good pest management.
      </p>

      <h4>1. Soil Preparation</h4>
      <p>
        Prepare fertile, loose and well-drained soil.
      </p>

      <h4>2. Seed</h4>
      <p>
        Use healthy seed with good germination.
      </p>

      <h4>3. Water</h4>
      <p>
        Maintain suitable moisture and avoid severe drying.
      </p>

      <h4>4. Weeding</h4>
      <p>
        Remove weeds early to reduce competition.
      </p>

      <h4>5. Pest Monitoring</h4>
      <p>
        Inspect leaves regularly for holes, discoloration and insects.
      </p>

      <h4>6. Harvest</h4>
      <p>
        Harvest leaves at the appropriate stage for your market or
        household use.
      </p>
    `
  }

};

// ============================================================
// GENERAL FARMING KNOWLEDGE
// ============================================================

const GENERAL_AGRI = {

  soil: `
    <h3>🌍 SOIL MANAGEMENT GUIDE</h3>

    <p>
      Soil is one of the most important resources on a farm. It provides
      plants with physical support, water and nutrients.
    </p>

    <h4>🌱 1. Know Your Soil</h4>
    <p>
      Observe soil texture, drainage and crop performance. A soil test
      can provide more useful information about nutrient levels and soil
      properties.
    </p>

    <h4>💧 2. Drainage</h4>
    <p>
      Poor drainage can cause root problems and reduce plant growth.
      Avoid planting crops in places where water remains stagnant unless
      the crop and production system are designed for those conditions.
    </p>

    <h4>🍂 3. Organic Matter</h4>
    <p>
      Compost, properly managed manure and crop residues can contribute
      organic matter and improve soil structure.
    </p>

    <h4>🌿 4. Soil Protection</h4>
    <p>
      Reduce unnecessary soil disturbance and protect soil from erosion
      where possible.
    </p>

    <h4>👨‍🌾 Farmer Tip</h4>
    <p>
      Do not assume that every field needs the same fertilizer. Soil
      condition and crop requirements are different.
    </p>
  `,

  fertilizer: `
    <h3>🧪 FERTILIZER GUIDE</h3>

    <p>
      Fertilizer supplies nutrients needed for plant growth. The correct
      fertilizer depends on the crop, soil condition and production goal.
    </p>

    <h4>🌱 Nitrogen</h4>
    <p>
      Nitrogen is important for vegetative growth and leaf development.
      Too much can cause excessive vegetative growth in some crops.
    </p>

    <h4>🌾 Phosphorus</h4>
    <p>
      Phosphorus is involved in root development and other plant
      processes.
    </p>

    <h4>🍃 Potassium</h4>
    <p>
      Potassium supports several plant functions including water
      regulation and crop quality.
    </p>

    <h4>🧪 NPK</h4>
    <p>
      NPK fertilizers contain nitrogen, phosphorus and potassium in
      specified proportions. The best formulation depends on crop and
      soil requirements.
    </p>

    <h4>⚠️ Important</h4>
    <p>
      Do not apply fertilizer simply because a crop looks weak. Yellow
      leaves or poor growth can have several causes. Soil testing and
      local extension advice can help identify the actual problem.
    </p>
  `,

  compost: `
    <h3>🍂 COMPOST GUIDE</h3>

    <p>
      Compost is decomposed organic material that can be used as a soil
      amendment.
    </p>

    <h4>Useful Materials</h4>
    <ul>
      <li>Crop residues</li>
      <li>Dry leaves</li>
      <li>Grass materials</li>
      <li>Suitable plant residues</li>
      <li>Properly managed organic manure</li>
    </ul>

    <h4>Good Compost</h4>
    <p>
      Mature compost is generally dark, crumbly and has a soil-like
      smell. Unfinished organic material should not be treated as
      finished compost.
    </p>

    <h4>Farmer Tip</h4>
    <p>
      Compost can improve soil organic matter, but it should be used as
      part of an overall soil fertility plan.
    </p>
  `,

  pests: `
    <h3>🐛 PEST MANAGEMENT GUIDE</h3>

    <p>
      Farm pests include insects and other organisms that can damage
      crops or reduce production.
    </p>

    <h4>1. Inspect Regularly</h4>
    <p>
      Check leaves, stems, flowers, roots and fruits regularly.
    </p>

    <h4>2. Identify the Problem</h4>
    <p>
      Do not treat every damaged plant as an insect problem. Damage can
      also come from disease, nutrient deficiency, water stress or
      environmental conditions.
    </p>

    <h4>3. Farm Hygiene</h4>
    <p>
      Remove severely affected plant material where appropriate and
      maintain good field sanitation.
    </p>

    <h4>4. Integrated Management</h4>
    <p>
      Use suitable cultural, physical, biological and other locally
      recommended management methods.
    </p>

    <h4>⚠️ Safety</h4>
    <p>
      Agricultural pesticides can be hazardous. If a pesticide is
      recommended locally, follow the product label and appropriate
      agricultural safety guidance rather than guessing a dose or
      mixing instructions.
    </p>
  `,

  irrigation: `
    <h3>💧 IRRIGATION GUIDE</h3>

    <p>
      Irrigation supplies water when rainfall is insufficient. Good
      irrigation should provide enough moisture without unnecessarily
      wasting water.
    </p>

    <h4>1. Check the Soil</h4>
    <p>
      Observe soil moisture before watering rather than following one
      fixed schedule for every crop.
    </p>

    <h4>2. Crop Stage</h4>
    <p>
      Water needs change during germination, vegetative growth,
      flowering and fruit or grain development.
    </p>

    <h4>3. Avoid Waterlogging</h4>
    <p>
      Too much water can reduce root oxygen and increase some disease
      problems.
    </p>

    <h4>4. Conserve Water</h4>
    <p>
      Mulching and efficient irrigation methods can help reduce
      unnecessary evaporation and water loss.
    </p>
  `,

  weeds: `
    <h3>🌿 WEED MANAGEMENT GUIDE</h3>

    <p>
      Weeds compete with crops for sunlight, water, nutrients and space.
    </p>

    <h4>1. Early Control</h4>
    <p>
      Control weeds before they become large and difficult to manage.
    </p>

    <h4>2. Manual Control</h4>
    <p>
      Hand weeding or suitable cultivation can be effective for smaller
      farms.
    </p>

    <h4>3. Mulching</h4>
    <p>
      Appropriate mulch can reduce the emergence of some weeds and help
      conserve soil moisture.
    </p>

    <h4>4. Good Crop Establishment</h4>
    <p>
      Healthy crops with appropriate spacing can compete better with
      weeds.
    </p>
  `,

  watering: `
    <h3>💧 WATERING GUIDE</h3>

    <p>
      Watering should depend on crop type, soil, weather and growth
      stage.
    </p>

    <p>
      Young seedlings usually need careful moisture management because
      their roots are still developing. Mature crops may have deeper
      roots, but water demand can become high during flowering and
      production stages.
    </p>

    <p>
      Avoid both severe drying and prolonged waterlogging.
    </p>
  `,

  harvest: `
    <h3>🌾 HARVESTING GUIDE</h3>

    <p>
      Harvest timing depends on the crop and the purpose of production.
    </p>

    <h4>Before Harvest</h4>
    <p>
      Inspect crop maturity, prepare clean harvesting tools and plan
      transportation or storage.
    </p>

    <h4>During Harvest</h4>
    <p>
      Handle crops carefully to reduce bruising, cuts and contamination.
    </p>

    <h4>After Harvest</h4>
    <p>
      Sort damaged produce, dry grains properly and move perishable
      crops to suitable storage or market conditions quickly.
    </p>
  `,

  storage: `
    <h3>📦 FARM STORAGE GUIDE</h3>

    <p>
      Proper storage helps reduce losses caused by moisture, insects,
      rodents, mould and poor handling.
    </p>

    <h4>🌬️ Dry Environment</h4>
    <p>
      Keep stored crops away from unnecessary moisture.
    </p>

    <h4>🧹 Clean Storage</h4>
    <p>
      Clean the storage area before bringing in a new harvest.
    </p>

    <h4>🐀 Rodent Protection</h4>
    <p>
      Protect stored produce from rats and other rodents.
    </p>

    <h4>🔎 Regular Inspection</h4>
    <p>
      Check stored crops regularly so problems can be identified early.
    </p>
  `,

  farmBusiness: `
    <h3>💰 FARM BUSINESS GUIDE</h3>

    <p>
      Farming is both an agricultural activity and a business. Good
      records can help a farmer understand whether a farm activity is
      making or losing money.
    </p>

    <h4>1. Record Expenses</h4>
    <p>
      Record seed, fertilizer, labour, transport, irrigation and other
      farm-related expenses.
    </p>

    <h4>2. Record Production</h4>
    <p>
      Record how much was harvested and how much was sold.
    </p>

    <h4>3. Know Your Market</h4>
    <p>
      Consider local demand, seasonal prices, transportation and
      storage before choosing what to produce.
    </p>

    <h4>4. Calculate Profit</h4>
    <p>
      A simple approach is:
      <strong>Profit = Total Revenue − Total Costs</strong>.
    </p>

    <h4>5. Plan Before Planting</h4>
    <p>
      A written farm plan can help reduce unexpected expenses and
      improve decision-making.
    </p>
  `,

  soilTest: `
    <h3>🧪 SOIL TESTING GUIDE</h3>

    <p>
      Soil testing helps identify important soil properties and nutrient
      conditions before major fertilizer decisions are made.
    </p>

    <h4>Why Test Soil?</h4>
    <ul>
      <li>Understand nutrient status</li>
      <li>Support better fertilizer decisions</li>
      <li>Identify some soil constraints</li>
      <li>Improve long-term soil management</li>
    </ul>

    <p>
      If a soil-testing service is available in your area, follow its
      sampling instructions and discuss the results with an agricultural
      extension professional.
    </p>
  `,

  yellowLeaves: `
    <h3>🍃 YELLOW LEAVES — POSSIBLE CAUSES</h3>

    <p>
      Yellow leaves do not always mean that a plant needs fertilizer.
      Several conditions can cause yellowing.
    </p>

    <ul>
      <li>Nutrient deficiency</li>
      <li>Too much water</li>
      <li>Too little water</li>
      <li>Root damage</li>
      <li>Disease</li>
      <li>Pest damage</li>
      <li>Natural ageing of older leaves</li>
      <li>Environmental stress</li>
    </ul>

    <p>
      Check the soil moisture, affected leaves, roots and surrounding
      plants before deciding on treatment.
    </p>
  `,

  poultry: `
    <h3>🐔 POULTRY FARMING GUIDE</h3>

    <p>
      Poultry farming requires good housing, clean water, suitable feed,
      hygiene and proper disease prevention.
    </p>

    <h4>1. Housing</h4>
    <p>
      Provide clean, dry and adequately ventilated housing that protects
      birds from weather and predators.
    </p>

    <h4>2. Water</h4>
    <p>
      Birds need regular access to clean drinking water.
    </p>

    <h4>3. Feed</h4>
    <p>
      Use feed appropriate for the birds' age and production purpose.
    </p>

    <h4>4. Hygiene</h4>
    <p>
      Clean drinkers and feeders regularly and keep the housing clean.
    </p>

    <h4>5. Health</h4>
    <p>
      Follow a vaccination and disease-prevention program recommended
      by qualified local veterinary professionals.
    </p>

    <h4>6. Records</h4>
    <p>
      Record bird numbers, feed use, mortality, vaccination and sales.
    </p>
  `,

  goat: `
    <h3>🐐 GOAT FARMING GUIDE</h3>

    <p>
      Goats need suitable housing, clean water, adequate nutrition and
      regular health monitoring.
    </p>

    <h4>Housing</h4>
    <p>
      Keep goats in a clean, dry and reasonably ventilated environment.
    </p>

    <h4>Feeding</h4>
    <p>
      Provide suitable forage and balanced supplementary feed where
      needed.
    </p>

    <h4>Water</h4>
    <p>
      Ensure access to clean drinking water.
    </p>

    <h4>Health</h4>
    <p>
      Watch for poor appetite, unusual behaviour, injuries or signs of
      illness and seek veterinary help when needed.
    </p>

    <h4>Records</h4>
    <p>
      Record births, purchases, sales, treatments and other important
      farm events.
    </p>
  `,

  cattle: `
    <h3>🐄 CATTLE FARMING GUIDE</h3>

    <p>
      Cattle production requires adequate feed, water, housing or
      shelter, hygiene and veterinary care.
    </p>

    <h4>Feed</h4>
    <p>
      Provide suitable forage and balanced nutrition according to the
      animal's age and production purpose.
    </p>

    <h4>Water</h4>
    <p>
      Provide clean drinking water regularly.
    </p>

    <h4>Health</h4>
    <p>
      Monitor animals daily and follow local veterinary recommendations
      for vaccination and disease prevention.
    </p>

    <h4>Housing</h4>
    <p>
      Keep animals in a clean environment with adequate shelter from
      harsh weather.
    </p>
  `,

  chicken: `
    <h3>🐔 CHICKEN FARMING GUIDE</h3>

    <p>
      Chicken farming requires clean housing, suitable feed, clean water,
      biosecurity and regular health monitoring.
    </p>

    <h4>For Chicks</h4>
    <p>
      Young chicks require suitable warmth, clean water and appropriate
      starter feed.
    </p>

    <h4>For Layers</h4>
    <p>
      Laying birds need suitable layer nutrition, clean water and
      comfortable housing.
    </p>

    <h4>For Broilers</h4>
    <p>
      Broilers need appropriate feed, water, ventilation and enough
      space for healthy growth.
    </p>

    <h4>Health</h4>
    <p>
      Follow veterinary and local poultry-health recommendations.
    </p>
  `

};

// ============================================================
// AI RESPONSE ENGINE
// ============================================================

function normalizeText(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:()[\]{}"'`]/g, " ")
    .replace(/\s+/g, " ");
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function getAIResponse(message) {

  const text = normalizeText(message);

  if (!text) {
    return `
      <h3>👋 Welcome to NOUR AGRI AI</h3>

      <p>
        I am your smart farming assistant. Ask me a farming question
        and I will give you a detailed guide.
      </p>

      <p><strong>Try:</strong></p>

      <ul>
        <li>How do I farm maize?</li>
        <li>Tell me about rice farming</li>
        <li>How can I grow tomato?</li>
        <li>What fertilizer is good for maize?</li>
        <li>Why are my leaves yellow?</li>
        <li>How do I control weeds?</li>
        <li>How do I start poultry farming?</li>
        <li>How can I manage my farm business?</li>
      </ul>
    `;
  }

  // Greetings
  if (
    containsAny(text, [
      "hello",
      "hi",
      "hey",
      "sannu",
      "good morning",
      "good afternoon",
      "good evening"
    ])
  ) {
    return `
      <h3>👋 Welcome, Farmer!</h3>

      <p>
        Welcome to <strong>NOUR AGRI AI</strong>, your smart farming
        assistant.
      </p>

      <p>
        You can ask me about crops, soil, fertilizer, irrigation,
        pests, diseases, livestock, harvesting, storage and farm
        business.
      </p>

      <p>
        <strong>Owner & Creator:</strong> Muhammad Laminu
      </p>
    `;
  }

  // Specific fertilizer + maize question
  if (
    containsAny(text, ["maize", "corn", "masara"]) &&
    containsAny(text, ["fertilizer", "fertiliser", "taki", "npk", "urea"])
  ) {
    return `
      <h3>🌽🧪 MAIZE FERTILIZER GUIDE</h3>

      <p>
        Maize needs balanced nutrition, but the correct fertilizer and
        amount depend on soil condition, maize variety, field history
        and local recommendations.
      </p>

      <h4>Important Nutrients</h4>

      <p>
        Nitrogen supports vegetative growth, while phosphorus and
        potassium contribute to important plant functions and crop
        development.
      </p>

      <h4>Before Applying Fertilizer</h4>

      <ul>
        <li>Consider soil testing where available.</li>
        <li>Know the crop variety.</li>
        <li>Consider previous crops grown on the field.</li>
        <li>Use locally recommended fertilizer guidance.</li>
      </ul>

      <h4>⚠️ Important</h4>

      <p>
        Do not use a random fertilizer quantity for every maize field.
        Too little may not meet crop needs, while excessive fertilizer
        can waste money and may damage plants or the environment.
      </p>

      <p>
        <strong>Farmer Tip:</strong> Good seed, spacing, weed control,
        water management and fertilizer should work together.
      </p>
    `;
  }

  // Specific tomato fertilizer question
  if (
    containsAny(text, ["tomato", "tumatir"]) &&
    containsAny(text, ["fertilizer", "fertiliser", "taki", "npk"])
  ) {
    return `
      <h3>🍅🧪 TOMATO FERTILIZER GUIDE</h3>

      <p>
        Tomato needs balanced nutrients throughout its growth. The
        correct fertilizer program depends on soil fertility, variety
        and production conditions.
      </p>

      <h4>🌱 Before Planting</h4>
      <p>
        Improve soil condition with suitable organic matter and use
        soil-test information where available.
      </p>

      <h4>🌿 During Growth</h4>
      <p>
        Tomato needs adequate nutrients for leaf growth, flowering and
        fruit development.
      </p>

      <h4>⚠️ Avoid Guessing</h4>
      <p>
        Do not apply large amounts of fertilizer simply because plants
        look weak. Yellow leaves or poor growth can have several causes.
      </p>

      <p>
        Follow locally recommended fertilizer guidance and product-label
        instructions.
      </p>
    `;
  }

  // Soil
  if (
    containsAny(text, [
      "soil",
      "kasa",
      "soil test",
      "testing soil"
    ])
  ) {
    return GENERAL_AGRI.soil;
  }

  // Soil testing
  if (
    containsAny(text, [
      "soil testing",
      "test soil",
      "soil test",
      "gwajin kasa"
    ])
  ) {
    return GENERAL_AGRI.soilTest;
  }

  // Fertilizer
  if (
    containsAny(text, [
      "fertilizer",
      "fertiliser",
      "taki",
      "npk",
      "urea"
    ])
  ) {
    return GENERAL_AGRI.fertilizer;
  }

  // Compost
  if (
    containsAny(text, [
      "compost",
      "organic fertilizer",
      "manure",
      "takin gargajiya"
    ])
  ) {
    return GENERAL_AGRI.compost;
  }

  // Pests
  if (
    containsAny(text, [
      "pest",
      "pests",
      "insect",
      "insects",
      "kwari",
      "kwari na gona"
    ])
  ) {
    return GENERAL_AGRI.pests;
  }

  // Irrigation / watering
  if (
    containsAny(text, [
      "irrigation",
      "irrigate",
      "water",
      "watering",
      "watering crops",
      "ban ruwa"
    ])
  ) {
    return GENERAL_AGRI.irrigation;
  }

  // Weeds
  if (
    containsAny(text, [
      "weed",
      "weeds",
      "weeding",
      "ciyawa",
      "ciyayi"
    ])
  ) {
    return GENERAL_AGRI.weeds;
  }

  // Yellow leaves
  if (
    containsAny(text, [
      "yellow leaves",
      "yellow leaf",
      "leaves yellow",
      "leaf yellow",
      "ganye ya zama rawaya",
      "ganyaye rawaya"
    ])
  ) {
    return GENERAL_AGRI.yellowLeaves;
  }

  // Harvest
  if (
    containsAny(text, [
      "harvest",
      "harvesting",
      "girbi"
    ])
  ) {
    return GENERAL_AGRI.harvest;
  }

  // Storage
  if (
    containsAny(text, [
      "storage",
      "store crops",
      "storing",
      "ajiya",
      "ajiyar gona"
    ])
  ) {
    return GENERAL_AGRI.storage;
  }

  // Farm business
  if (
    containsAny(text, [
      "farm business",
      "business",
      "profit",
      "profitability",
      "budget",
      "market",
      "selling",
      "kasuwanci",
      "riba"
    ])
  ) {
    return GENERAL_AGRI.farmBusiness;
  }

  // Poultry
  if (
    containsAny(text, [
      "poultry",
      "poultry farming",
      "chicken farming",
      "kaji",
      "kaza"
    ])
  ) {
    return GENERAL_AGRI.poultry;
  }

  // Goat
  if (
    containsAny(text, [
      "goat",
      "goats",
      "akuya"
    ])
  ) {
    return GENERAL_AGRI.goat;
  }

  // Cattle
  if (
    containsAny(text, [
      "cattle",
      "cow",
      "cows",
      "shanu",
      "saniya"
    ])
  ) {
    return GENERAL_AGRI.cattle;
  }

  // Chicken
  if (
    containsAny(text, [
      "chicken",
      "chickens",
      "broiler",
      "layer",
      "layers",
      "chicks"
    ])
  ) {
    return GENERAL_AGRI.chicken;
  }

  // Crop database
  const cropOrder = [
    "maize",
    "rice",
    "tomato",
    "pepper",
    "beans",
    "groundnut",
    "cassava",
    "yam",
    "onion",
    "cabbage",
    "carrot",
    "cucumber",
    "okra",
    "spinach"
  ];

  for (const cropName of cropOrder) {
    const crop = AGRI_KNOWLEDGE[cropName];

    if (crop && containsAny(text, crop.keywords)) {
      return crop.answer;
    }
  }

  // Thanks
  if (
    containsAny(text, [
      "thanks",
      "thank you",
      "nagode",
      "thank"
    ])
  ) {
    return `
      <h3>😊 You're Welcome!</h3>

      <p>
        I am happy to help you with your farming questions.
      </p>

      <p>
        Keep learning, keep your farm records, and make decisions based
        on good agricultural information.
      </p>

      <p>
        <strong>NOUR AGRI AI</strong><br>
        Owner & Creator: Muhammad Laminu
      </p>
    `;
  }

  // Help
  if (
    containsAny(text, [
      "help",
      "what can you do",
      "me zaka iya",
      "how can you help"
    ])
  ) {
    return `
      <h3>🤖 NOUR AGRI AI CAN HELP WITH:</h3>

      <ul>
        <li>🌽 Maize farming</li>
        <li>🌾 Rice farming</li>
        <li>🍅 Tomato farming</li>
        <li>🌶️ Pepper farming</li>
        <li>🫘 Beans farming</li>
        <li>🥜 Groundnut farming</li>
        <li>🥔 Cassava farming</li>
        <li>🍠 Yam farming</li>
        <li>🧅 Onion farming</li>
        <li>🥬 Vegetable farming</li>
        <li>🌍 Soil management</li>
        <li>🧪 Fertilizer</li>
        <li>💧 Irrigation</li>
        <li>🌿 Weed management</li>
        <li>🐛 Pest monitoring</li>
        <li>🐔 Poultry</li>
        <li>🐐 Goat farming</li>
        <li>🐄 Cattle farming</li>
        <li>📦 Storage</li>
        <li>💰 Farm business</li>
      </ul>

      <p>
        Ask your question naturally. For example:
        <strong>"How do I farm maize?"</strong>
      </p>
    `;
  }

  // Fallback
  return `
    <h3>🤖 NOUR AGRI AI</h3>

    <p>
      I understand that you are asking about:
      <strong>${escapeHTML(message)}</strong>
    </p>

    <p>
      I currently have detailed guidance for many farming topics,
      including crops, soil, fertilizer, irrigation, weeds, pests,
      livestock, harvesting, storage and farm business.
    </p>

    <h4>🌱 Try asking:</h4>

    <ul>
      <li>How do I farm maize?</li>
      <li>Tell me everything about tomato farming.</li>
      <li>How do I grow rice?</li>
      <li>Why are my leaves yellow?</li>
      <li>Tell me about fertilizer.</li>
      <li>How do I control weeds?</li>
      <li>How do I start poultry farming?</li>
      <li>How do I manage my farm business?</li>
    </ul>

    <p>
      <strong>Owner & Creator:</strong> Muhammad Laminu
    </p>
  `;
}

// ============================================================
// ESCAPE USER TEXT
// ============================================================

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// AI CHAT
// ============================================================

function initializeAI() {
  const form = getElement("aiChatForm");
  const input = getElement("aiInput");
  const messages = getElement("chatMessages");

  if (!form || !input || !messages) {
    console.warn(
      "AI elements not found. Check Index.html IDs: aiChatForm, aiInput, chatMessages."
    );
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) return;

    sendAIMessage(message);

    input.value = "";
    input.focus();
  });

  const suggestionButtons = $$(".ai-suggestions button");

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const text =
        button.dataset.question ||
        button.textContent.trim();

      if (!text) return;

      input.value = text;
      sendAIMessage(text);
      input.value = "";
    });
  });
}

function sendAIMessage(message) {
  const messages = getElement("chatMessages");

  if (!messages) return;

  addChatMessage(message, "user");

  const typing = addTypingIndicator();

  setTimeout(() => {
    if (typing) typing.remove();

    const response = getAIResponse(message);

    addChatMessage(response, "ai");
  }, 500);
}

function addChatMessage(content, sender) {
  const messages = getElement("chatMessages");

  if (!messages) return;

  const messageElement = document.createElement("div");

  messageElement.className =
    sender === "user"
      ? "chat-message user-message"
      : "chat-message ai-message";

  const avatar =
    sender === "user"
      ? "👤"
      : "🌱";

  messageElement.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      ${sender === "user" ? escapeHTML(content) : content}
    </div>
  `;

  messages.appendChild(messageElement);

  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: "smooth"
  });

  return messageElement;
}

function addTypingIndicator() {
  const messages = getElement("chatMessages");

  if (!messages) return null;

  const typing = document.createElement("div");

  typing.className =
    "chat-message ai-message typing-message";

  typing.innerHTML = `
    <div class="message-avatar">🌱</div>
    <div class="message-content">
      <span class="typing-dot">●</span>
      <span class="typing-dot">●</span>
      <span class="typing-dot">●</span>
    </div>
  `;

  messages.appendChild(typing);

  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: "smooth"
  });

  return typing;
}

// ============================================================
// CROP SEARCH
// ============================================================

function initializeCropSearch() {
  const searchInput = getElement("cropSearch");
  const cropList = getElement("cropList");

  if (!searchInput || !cropList) return;

  searchInput.addEventListener("input", () => {
    const search = normalizeText(searchInput.value);

    const cards = cropList.querySelectorAll(".guide-card");

    cards.forEach((card) => {
      const content = normalizeText(card.textContent);

      card.style.display =
        !search || content.includes(search)
          ? ""
          : "none";
    });
  });
}

// ============================================================
// FERTILIZER CALCULATOR
// ============================================================

function initializeFertilizerCalculator() {
  const button = getElement("calculateButton");

  if (!button) return;

  button.addEventListener("click", calculateFertilizer);
}

function calculateFertilizer() {
  const crop = getElement("calcCrop")?.value || "Crop";
  const fertilizer =
    getElement("fertilizerType")?.value || "Fertilizer";

  const fieldSize =
    parseFloat(getElement("fieldSize")?.value);

  const result = getElement("calculationResult");

  if (!result) return;

  if (!fieldSize || fieldSize <= 0) {
    result.innerHTML = `
      <h4>⚠️ Enter Field Size</h4>
      <p>
        Please enter a valid field size before calculating.
      </p>
    `;

    showToast("Please enter a valid field size.");

    return;
  }

  /*
    This calculator is intentionally a planning helper.
    It does not invent a universal fertilizer rate.
    The actual rate should come from soil testing,
    crop recommendations and local agricultural guidance.
  */

  result.innerHTML = `
    <h4>🧪 Fertilizer Planning Result</h4>

    <p>
      <strong>Crop:</strong> ${escapeHTML(crop)}
    </p>

    <p>
      <strong>Fertilizer:</strong> ${escapeHTML(fertilizer)}
    </p>

    <p>
      <strong>Field Size:</strong> ${fieldSize}
    </p>

    <hr>

    <p>
      Fertilizer quantity should be selected using the recommended
      application rate for your crop, soil condition and field size.
    </p>

    <p>
      <strong>Important:</strong> Do not use a random fertilizer rate.
      Check soil-test results and local agricultural recommendations.
    </p>
  `;

  showToast("Fertilizer plan prepared.");
}

// ============================================================
// FARM RECORDS
// ============================================================

const RECORDS_KEY = "nourAgriFarmRecords";

function initializeFarmRecords() {
  const addButton = getElement("addRecordButton");
  const closeButton = getElement("closeModal");
  const saveButton = getElement("saveRecordButton");
  const modal = getElement("recordModal");

  if (addButton) {
    addButton.addEventListener("click", () => {
      openRecordModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeRecordModal();
    });
  }

  if (saveButton) {
    saveButton.addEventListener("click", saveFarmRecord);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeRecordModal();
      }
    });
  }

  renderFarmRecords();
}

function openRecordModal() {
  const modal = getElement("recordModal");

  if (!modal) return;

  modal.classList.add("active");

  const title = getElement("recordTitle");

  if (title) {
    title.focus();
  }
}

function closeRecordModal() {
  const modal = getElement("recordModal");

  if (!modal) return;

  modal.classList.remove("active");
}

function saveFarmRecord() {
  const title = getElement("recordTitle")?.value.trim();
  const details = getElement("recordDetails")?.value.trim();

  if (!title || !details) {
    showToast("Please fill in both fields.");
    return;
  }

  const records = getFarmRecords();

  const newRecord = {
    id: Date.now(),
    title,
    details,
    date: new Date().toLocaleDateString()
  };

  records.unshift(newRecord);

  localStorage.setItem(
    RECORDS_KEY,
    JSON.stringify(records)
  );

  const titleInput = getElement("recordTitle");
  const detailsInput = getElement("recordDetails");

  if (titleInput) titleInput.value = "";
  if (detailsInput) detailsInput.value = "";

  closeRecordModal();

  renderFarmRecords();

  showToast("Farm record saved successfully.");
}

function getFarmRecords() {
  try {
    const records =
      JSON.parse(localStorage.getItem(RECORDS_KEY));

    return Array.isArray(records)
      ? records
      : [];
  } catch (error) {
    console.error("Could not load farm records:", error);
    return [];
  }
}

function renderFarmRecords() {
  const list = getElement("recordsList");

  if (!list) return;

  const records = getFarmRecords();

  if (!records.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <h3>No Farm Records Yet</h3>
        <p>
          Add your first farm record to start tracking your farm.
        </p>
      </div>
    `;

    return;
  }

  list.innerHTML = records
    .map(
      (record) => `
        <div class="record-card" data-record-id="${record.id}">
          <div class="record-header">
            <h3>${escapeHTML(record.title)}</h3>
            <span>${escapeHTML(record.date)}</span>
          </div>

          <p>${escapeHTML(record.details)}</p>

          <button
            class="delete-record-button"
            data-delete-record="${record.id}"
            type="button"
          >
            Delete
          </button>
        </div>
      `
    )
    .join("");

  list.querySelectorAll("[data-delete-record]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        deleteFarmRecord(
          Number(button.dataset.deleteRecord)
        );
      });
    });
}

function deleteFarmRecord(id) {
  const records = getFarmRecords()
    .filter((record) => record.id !== id);

  localStorage.setItem(
    RECORDS_KEY,
    JSON.stringify(records)
  );

  renderFarmRecords();

  showToast("Farm record deleted.");
}

// ============================================================
// NOTIFICATIONS
// ============================================================

function initializeNotifications() {
  const button = getElement("notificationButton");

  if (!button) return;

  button.addEventListener("click", () => {
    showToast(
      "🌱 Keep checking your crops, soil moisture and farm records."
    );
  });
}

// ============================================================
// PROFILE
// ============================================================

function initializeProfile() {
  const profileName =
    localStorage.getItem("nourAgriProfileName");

  const nameElements = document.querySelectorAll(
    ".profile-name, #profileName"
  );

  if (profileName) {
    nameElements.forEach((element) => {
      element.textContent = profileName;
    });
  }
}

// ============================================================
// HOME STATS
// ============================================================

function initializeStats() {
  updateStats();
}

function updateStats() {
  const records = getFarmRecords();

  const recordCount =
    getElement("recordCount");

  if (recordCount) {
    recordCount.textContent = records.length;
  }
}

// ============================================================
// WEATHER DEMO
// ============================================================

function initializeWeather() {
  const weatherTemp = getElement("weatherTemperature");
  const weatherCondition = getElement("weatherCondition");

  if (weatherTemp) {
    weatherTemp.textContent = "28°C";
  }

  if (weatherCondition) {
    weatherCondition.textContent =
      "Weather information";
  }

  console.log(
    "Weather module is currently using demo data."
  );
}

// ============================================================
// TOAST
// ============================================================

function initializeToast() {
  const toast = getElement("toast");

  if (toast) {
    toast.classList.remove("show");
  }
}

let toastTimer;

function showToast(message) {
  const toast = getElement("toast");
  const toastMessage = getElement("toastMessage");

  if (!toast || !toastMessage) {
    console.log(message);
    return;
  }

  toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ============================================================
// ONLINE / OFFLINE STATUS
// ============================================================

function initializeOnlineStatus() {
  updateConnectionStatus();

  window.addEventListener(
    "online",
    updateConnectionStatus
  );

  window.addEventListener(
    "offline",
    updateConnectionStatus
  );
}

function updateConnectionStatus() {
  if (navigator.onLine) {
    console.log("NOUR AGRI AI: Online");
  } else {
    console.log("NOUR AGRI AI: Offline");
    showToast(
      "You are offline. Some online features may not work."
    );
  }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();

      const input = getElement("aiInput");

      if (input) {
        input.focus();
      }
    }

    if (event.key === "Escape") {
      closeMobileSidebar();
      closeRecordModal();
    }
  });
}

// ============================================================
// SERVICE WORKER
// ============================================================

function registerServiceWorker() {

  if (!("serviceWorker" in navigator)) {
    console.log(
      "Service Worker is not supported by this browser."
    );

    return;
  }

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {

        console.log(
          "NOUR AGRI AI Service Worker registered:",
          registration.scope
        );

      })
      .catch((error) => {

        console.error(
          "Service Worker registration failed:",
          error
        );

      });

  });
}

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

window.addEventListener("error", (event) => {
  console.error(
    "NOUR AGRI AI error:",
    event.error || event.message
  );
});

window.addEventListener(
  "unhandledrejection",
  (event) => {
    console.error(
      "NOUR AGRI AI promise error:",
      event.reason
    );
  }
);

// ============================================================
// FINAL APP INFORMATION
// ============================================================

console.log(
  `${APP.name} | Owner & Creator: ${APP.owner}`
);
