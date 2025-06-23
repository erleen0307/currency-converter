const fromSelect = document.querySelector(".fromSelect");
const toSelect = document.querySelector(".toSelect");
const fromImage = document.querySelector(".from-container img");
const toImage = document.querySelector(".to-container img");
const fromAmount = document.querySelector(".fromAmount");
const toAmount = document.querySelector(".toAmount");
const swapIcon = document.querySelector(".swap-icon");
const conversionRateText = document.querySelector(".conversionRateText");
const darkToggle = document.querySelector(".dark-toggle");

const countryCurrencyMap = {};

function updateFlag(select, image) {
    const code = select.value.toLowerCase();
    image.src = `https://flagcdn.com/48x36/${code}.png`;
    image.alt = `${code.toUpperCase()} Flag`;
}

// Fetch countries and currencies
fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,flags")
    .then(res => res.json())
    .then(data => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        data.forEach(({ name, cca2, currencies }) => {
            const option1 = new Option(name.common, cca2);
            const option2 = new Option(name.common, cca2);
            fromSelect.append(option1);
            toSelect.append(option2);
            if (currencies) {
                countryCurrencyMap[cca2] = Object.keys(currencies)[0];
            }
        });
        fromSelect.value = "US";
        toSelect.value = "IN";
        updateFlag(fromSelect, fromImage);
        updateFlag(toSelect, toImage);
    });

// Event listeners
[fromSelect, toSelect].forEach(select => {
    select.addEventListener("change", () => {
        updateFlag(fromSelect, fromImage);
        updateFlag(toSelect, toImage);
        fromAmount.dispatchEvent(new Event("input"));
    });
});

fromAmount.addEventListener("input", () => {
    const amount = parseFloat(fromAmount.value);
    const fromCurrency = countryCurrencyMap[fromSelect.value];
    const toCurrency = countryCurrencyMap[toSelect.value];

    if (isNaN(amount) || amount <= 0) {
        toAmount.value = "";
        conversionRateText.innerText = "";
        return;
    }

    if (fromCurrency === toCurrency) {
        toAmount.value = amount.toFixed(2);
        conversionRateText.innerText = `1 ${fromCurrency} = 1 ${toCurrency}`;
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/c90e547bb7a73ad26d452f90/pair/${fromCurrency}/${toCurrency}/${amount}`)
        .then(res => res.json())
        .then(data => {
            if (data.result === "success") {
                toAmount.value = data.conversion_result.toFixed(2);
                conversionRateText.innerText = `1 ${fromCurrency} = ${data.conversion_rate.toFixed(2)} ${toCurrency}`;
            } else {
                toAmount.value = "Error";
                conversionRateText.innerText = "Conversion failed.";
            }
        })
        .catch(() => {
            toAmount.value = "Error";
            conversionRateText.innerText = "Network error.";
        });
});

// Swap currencies
swapIcon.addEventListener("click", () => {
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    updateFlag(fromSelect, fromImage);
    updateFlag(toSelect, toImage);
    fromAmount.dispatchEvent(new Event("input"));
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkToggle.textContent = isDark ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode";
});

// On load
window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        darkToggle.textContent = "☀️ Toggle Light Mode";
    }
});
