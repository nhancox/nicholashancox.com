const OBJECT_HIT_DAMAGE = {
  huge: {
    damage: {
      d: 12,
      number: 2,
      plus: 4
    },
    hit: 8
  },
  large: {
    damage: {
      d: 10,
      number: 2,
      plus: 2
    },
    hit: 6
  },
  medium: {
    damage: {
      d: 6,
      number: 2,
      plus: 1
    },
    hit: 5
  },
  small: {
    damage: {
      d: 8,
      number: 1,
      plus: 2
    },
    hit: 6
  },
  tiny: {
    damage: {
      d: 4,
      number: 1,
      plus: 4
    },
    hit: 8
  }
};
const OBJECT_SIZES = ["Tiny", "Small", "Medium", "Large", "Huge"];

document.getElementById("roll-damage").addEventListener("click", rollDamage);
document.getElementById("roll-hit").addEventListener("click", rollHit);
populateSpellDetails();

const numberInput = document.getElementById("number-input");
const resultArea = document.getElementById("result-area");
const rawRollDetails = document.getElementById("raw-rolls");
const sizeInput = document.getElementById("size-select");

function populateSpellDetails() {
  const detailSection = document.getElementById("spell");

  let detailContent = "<ul>";
  OBJECT_SIZES.forEach((size) => {
    const sizeValues = OBJECT_HIT_DAMAGE[size.toLowerCase()];
    detailContent += `<li>${size}<ul>`;
    detailContent += `<li>Plus to Hit: ${sizeValues.hit}</li>`;
    detailContent += `<li>Damage: ${sizeValues.damage.number}d${sizeValues.damage.d}+${sizeValues.damage.plus}`;
    detailContent += "</ul></li>";
  });
  detailContent += "</ul>";

  detailSection.innerHTML = detailContent;
}

function rollDice(max) {
  const MIN_ROLL = 1;
  return Math.floor(Math.random() * (max - MIN_ROLL + 1)) + MIN_ROLL;
}

function rollDamage() {
  if (!sizeInput.checkValidity() || !numberInput.checkValidity()) {
    return;
  }

  const objectSize = sizeInput.value;
  const totalObjects = numberInput.valueAsNumber;

  const damageValues = OBJECT_HIT_DAMAGE[objectSize].damage;

  let rolls = [];
  const results = [];

  for (let i = 1; i <= totalObjects; i++) {
    let objectDamage = 0;
    const objectRolls = [];

    for (let j = 1; j <= damageValues.number; j++) {
      const roll = rollDice(damageValues.d);
      objectRolls.push(roll);
      objectDamage += roll + damageValues.plus;
    }

    results.push(objectDamage);
    rolls.push(objectRolls);
  }

  const totalDamage = results.reduce((total, current) => {
    return total + current;
  }, 0);

  if (Array.isArray(rolls[0])) {
    rolls = rolls.map((roleSet) => {
      return roleSet.join(" & ");
    });
  }

  resultArea.innerHTML = `<h3>Damage</h3><p>${totalDamage}</p>`;
  rawRollDetails.innerHTML = rolls.join(", ");

  showResultSection();
}

function rollHit() {
  if (!sizeInput.checkValidity() || !numberInput.checkValidity()) {
    return;
  }

  const objectSize = sizeInput.value;
  const totalObjects = numberInput.valueAsNumber;

  const hitValue = OBJECT_HIT_DAMAGE[objectSize].hit;

  const rolls = [];
  const results = [];

  for (let i = 1; i <= totalObjects; i++) {
    const roll = rollDice(20);
    rolls.push(roll);
    results.push(roll + hitValue);
  }

  let hitResults = "<p>";
  results.forEach((result) => {
    hitResults += `<span class="hit-result">${result}</span>`;
  });
  hitResults += "</p>";

  resultArea.innerHTML = `<h3>Hit Rolls</h3>${hitResults}`;
  rawRollDetails.innerHTML = rolls.join(", ");

  showResultSection();
}

function showResultSection() {
  const rawRollDetailsParent = document.getElementById("raw-rolls-details");
  const resultSection = document.getElementById("result-section");

  if (resultSection.hasAttribute("hidden")) {
    resultSection.removeAttribute("hidden");
  }

  if (rawRollDetailsParent.hasAttribute("open")) {
    rawRollDetailsParent.removeAttribute("open");
  }
}
