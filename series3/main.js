document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const tabs = document.querySelectorAll('.tab-btn');
    const converterSections = document.querySelectorAll('.converter-section');

    const inputs = {
        length: document.getElementById('length-input'),
        weight: document.getElementById('weight-input'),
        temperature: document.getElementById('temperature-input'),
    };

    const selects = {
        length: { from: document.getElementById('length-from'), to: document.getElementById('length-to') },
        weight: { from: document.getElementById('weight-from'), to: document.getElementById('weight-to') },
        temperature: { from: document.getElementById('temperature-from'), to: document.getElementById('temperature-to') },
    };

    const results = {
        length: document.getElementById('length-result'),
        weight: document.getElementById('weight-result'),
        temperature: document.getElementById('temperature-result'),
    };

    // --- Unit Definitions ---
    const units = {
        length: {
            'mm': { name: '밀리미터 (mm)', to_base: 0.001 },
            'cm': { name: '센티미터 (cm)', to_base: 0.01 },
            'm': { name: '미터 (m)', to_base: 1 },
            'km': { name: '킬로미터 (km)', to_base: 1000 },
            'in': { name: '인치 (inch)', to_base: 0.0254 },
            'ft': { name: '피트 (ft)', to_base: 0.3048 },
            'yd': { name: '야드 (yd)', to_base: 0.9144 },
            'mi': { name: '마일 (mi)', to_base: 1609.34 },
            '리': { name: '리 (里, 한국)', to_base: 3927.27 }, // 약 3.9km
            '자': { name: '자 (尺, 한국)', to_base: 0.303 }, // 약 30.3cm
        },
        weight: {
            'mg': { name: '밀리그램 (mg)', to_base: 0.001 },
            'g': { name: '그램 (g)', to_base: 1 },
            'kg': { name: '킬로그램 (kg)', to_base: 1000 },
            't': { name: '톤 (t)', to_base: 1000000 },
            'oz': { name: '온스 (oz)', to_base: 28.3495 },
            'lb': { name: '파운드 (lb)', to_base: 453.592 },
            '근': { name: '근 (斤, 한국)', to_base: 600 }, // 보통 600g
            '돈': { name: '돈 (돈, 한국)', to_base: 3.75 }, // 금 단위
            'pood': { name: '푸드 (pood, 러시아)', to_base: 16380 }, // 약 16.38kg
        },
        // 온도 변환은 공식이 다르므로 별도 처리
        temperature: {
            'C': { name: '섭씨 (°C)' },
            'F': { name: '화씨 (°F)' },
            'K': { name: '절대온도 (K)' },
        }
    };

    // --- Functions ---

    /**
     * Populate select dropdowns with units
     */
    function populateSelects() {
        for (const type in units) {
            const fromSelect = selects[type].from;
            const toSelect = selects[type].to;
            const unitGroup = units[type];

            for (const unit in unitGroup) {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unitGroup[unit].name;

                fromSelect.appendChild(option.cloneNode(true));
                toSelect.appendChild(option.cloneNode(true));
            }
            // Set default selections
            if (type === 'length') {
                fromSelect.value = 'm';
                toSelect.value = 'ft';
            } else if (type === 'weight') {
                fromSelect.value = 'kg';
                toSelect.value = 'lb';
            } else {
                fromSelect.value = 'C';
                toSelect.value = 'F';
            }
        }
    }

    /**
     * Perform the unit conversion
     */
    function convert() {
        const activeType = document.querySelector('.tab-btn.active').dataset.converter;
        const value = parseFloat(inputs[activeType].value);
        const fromUnit = selects[activeType].from.value;
        const toUnit = selects[activeType].to.value;

        if (isNaN(value)) {
            results[activeType].textContent = '유효한 숫자를 입력하세요.';
            return;
        }
        
        let resultValue;

        // Special handling for temperature
        if (activeType === 'temperature') {
            let tempInC;
            // First, convert input to Celsius
            if (fromUnit === 'C') tempInC = value;
            else if (fromUnit === 'F') tempInC = (value - 32) * 5 / 9;
            else if (fromUnit === 'K') tempInC = value - 273.15;

            // Then, convert from Celsius to the target unit
            if (toUnit === 'C') resultValue = tempInC;
            else if (toUnit === 'F') resultValue = (tempInC * 9 / 5) + 32;
            else if (toUnit === 'K') resultValue = tempInC + 273.15;
        } else {
            // Standard conversion for length and weight
            const fromToBase = units[activeType][fromUnit].to_base;
            const toFromBase = units[activeType][toUnit].to_base;
            const baseValue = value * fromToBase;
            resultValue = baseValue / toFromBase;
        }
        
        results[activeType].textContent = `${value.toLocaleString()} ${units[activeType][fromUnit].name.split(' (')[0]} = ${resultValue.toLocaleString(undefined, { maximumFractionDigits: 5 })} ${units[activeType][toUnit].name.split(' (')[0]}`;
    }

    // --- Event Listeners ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all
            tabs.forEach(t => t.classList.remove('active'));
            converterSections.forEach(s => s.classList.remove('active'));

            // Activate clicked tab and section
            tab.classList.add('active');
            document.getElementById(tab.dataset.converter).classList.add('active');
            
            // Trigger conversion for the new active tab
            convert();
        });
    });

    // Add event listeners to all inputs and selects
    for (const type in inputs) {
        inputs[type].addEventListener('input', convert);
        selects[type].from.addEventListener('change', convert);
        selects[type].to.addEventListener('change', convert);
    }
    
    // --- Initial Load ---
    populateSelects();
    convert(); // Initial conversion on page load
});
