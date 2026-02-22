/**
 * Loss Lab Series: Life Loss Lab
 * Quiz format: 20 Questions about time wasting habits.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const QUESTIONS = [
        { text: "さっきまで何をしていたか忘れる", points: 4 },
        { text: "「明日から本気出す」を実行できたことがない", points: 5 },
        { text: "惰性でゲームを続けてしまう", points: 2 },
        { text: "風呂に入るまでに無駄に時間がかかる", points: 2 },
        { text: "何度も同じ場所をウロウロする", points: 2 },
        { text: "暇になるとすぐスマホを開く", points: 2 },
        { text: "セール品を見ているだけで時間が溶ける", points: 3 },
        { text: "気づいたら時間が経っていて驚く", points: 3 },
        { text: "やることリストを作るだけで満足する", points: 4 },
        { text: "買うべきかを悩んでいるうちに、商品が値上がりして後悔する", points: 3 },
        { text: "生活リズムがズレて戻すのに時間がかかる", points: 4 },
        { text: "片付けを始めると何故か漫画を読み始める", points: 4 },
        { text: "外に出る準備をしたけど、疲れてやめる", points: 3 },
        { text: "買う気がないのにレビューだけ読む", points: 2 },
        { text: "休憩のつもりが長時間になる", points: 2 },
        { text: "選択肢が多いほど選べなくなる", points: 4 },
        { text: "「まずは形から」で道具だけが増える", points: 2 },
        { text: "物を取りに行ったのに手ぶらで戻ってくる", points: 2 },
        { text: "自分のやる気スイッチが壊れてる気がする", points: 5 },
        { text: "今この時間も虚無だと思ってる", points: 5 }
    ];

    const MAX_SCORE = QUESTIONS.reduce((sum, q) => sum + q.points, 0); // 62

    const LAB_CONFIG = {
        title: "人生損失ラボ - 虚無への問い",
        benzPrice: 15000000,
        hourlyWage: 1200,
        messages: [
            "ふむ、これまで虚無を積み上げてきた達人ですね。あなたの人生の足跡、砂時計の砂が虚空に消えています。",
            "時間は金なりと言いますが、今日までドブに捨て続けてきたようですよ。自覚はありますか？",
            "今日までの損失額で、高級車が買えたはずですね。失った時間は二度と戻りません。",
            "過去に捧げた膨大な虚無。それはそれで、王族のような贅沢な浪費の歴史ですね（皮肉です）。",
            "あなたの砂時計、過去に溜まった虚無の重みで割れそうですよ。今のうちに現実を見なさい。",
            "積み上げた損失を可視化して、少しは後悔の念が湧きましたか？ 反省しなさい。"
        ]
    };

    // --- DOM Elements ---
    const ageInput = document.getElementById('age');
    const questionsList = document.getElementById('questions-list');
    const calcBtn = document.getElementById('calc-btn');
    const resultArea = document.getElementById('result-area');
    const inputForm = document.querySelector('.input-form');

    const totalScoreText = document.getElementById('total-score');
    const nihilityRateText = document.getElementById('nihility-rate');
    const dailyLossText = document.getElementById('daily-loss');
    const totalLossTimeText = document.getElementById('total-loss-time');
    const totalLossMoneyText = document.getElementById('total-loss-money');
    const benzCountText = document.getElementById('benz-count');
    const totalLossDaysText = document.getElementById('total-loss-days');
    const ageSlider = document.getElementById('age-slider');
    const ageSecretBtn = document.getElementById('age-secret-btn');
    const ageUnit = document.getElementById('age-unit');
    const ageSpinUp = document.getElementById('age-spin-up');
    const ageSpinDown = document.getElementById('age-spin-down');
    const ageSpinBtns = document.getElementById('age-spin-btns');
    const spiritMessage = document.getElementById('spirit-message');

    const shareBtn = document.getElementById('share-btn');
    const resetBtn = document.getElementById('reset-btn');

    // --- State ---
    const answers = new Array(QUESTIONS.length).fill(0); // 1, -1, 0

    // --- Init ---
    const init = () => {
        QUESTIONS.forEach((q, index) => {
            const item = document.createElement('div');
            item.className = 'question-item';
            item.innerHTML = `
                <p class="question-text">${index + 1}. ${q.text}</p>
                <div class="options-group">
                    <button class="option-btn" data-index="${index}" data-value="1">はい</button>
                    <button class="option-btn" data-index="${index}" data-value="0">どちらでもない</button>
                    <button class="option-btn" data-index="${index}" data-value="-1">いいえ</button>
                </div>
            `;
            questionsList.appendChild(item);
        });

        // Event delegation for option buttons
        questionsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                const index = parseInt(e.target.dataset.index);
                const value = parseInt(e.target.dataset.value);

                // Update state
                answers[index] = value;

                // UI Update: Toggle active class
                const parent = e.target.parentElement;
                parent.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        const updateSliderProgress = () => {
            const val = ageSlider.value;
            const min = parseFloat(ageSlider.min) || 1;
            const max = parseFloat(ageSlider.max) || 130;
            const percentage = ((val - min) / (max - min)) * 100;
            ageSlider.style.setProperty('--progress', `${percentage}%`);
        };

        ageInput.addEventListener('input', () => {
            if (!ageInput.disabled) {
                ageSlider.value = ageInput.value;
                updateSliderProgress();
            }
        });

        ageSlider.addEventListener('input', () => {
            if (!ageSlider.disabled) {
                ageInput.value = ageSlider.value;
                updateSliderProgress();
            }
        });

        // Custom spin buttons
        ageSpinUp.addEventListener('click', () => {
            if (!ageInput.disabled) {
                const max = parseInt(ageInput.max) || 130;
                let val = parseInt(ageInput.value) || 0;
                if (val < max) {
                    ageInput.value = val + 1;
                    ageSlider.value = ageInput.value;
                    updateSliderProgress();
                }
            }
        });

        ageSpinDown.addEventListener('click', () => {
            if (!ageInput.disabled) {
                const min = parseInt(ageInput.min) || 1;
                let val = parseInt(ageInput.value) || 0;
                if (val > min) {
                    ageInput.value = val - 1;
                    ageSlider.value = ageInput.value;
                    updateSliderProgress();
                }
            }
        });

        ageSecretBtn.addEventListener('click', () => {
            const isActive = ageSecretBtn.classList.toggle('active');
            if (isActive) {
                // Save current numeric value
                ageInput.dataset.prevVal = ageInput.value;
                ageInput.type = 'text';
                ageInput.value = '秘密';
                ageInput.disabled = true;
                ageSlider.disabled = true;
                ageSlider.classList.add('secret-active');
                ageUnit.style.display = 'none';
                ageSpinBtns.style.display = 'none';
            } else {
                ageInput.type = 'number';
                // Restore previous numeric value
                ageInput.value = ageInput.dataset.prevVal || 20;
                ageInput.disabled = false;
                ageSlider.disabled = false;
                ageSlider.value = ageInput.value;
                ageSlider.classList.remove('secret-active');
                ageUnit.style.display = 'inline';
                ageSpinBtns.style.display = 'flex';
                updateSliderProgress();
            }
        });

        // Init progress
        updateSliderProgress();
    };

    const formatTime = (h) => {
        if (h >= 10000) {
            return (h / 10000).toFixed(1) + "万時間";
        }
        return h.toLocaleString() + "時間";
    };

    const formatMoney = (n) => {
        const oku = Math.floor(n / 100000000);
        const man = Math.floor((n % 100000000) / 10000);
        const yen = n % 10000;
        let res = "";
        if (oku > 0) res += oku + "億";
        if (man > 0) res += man + "万";
        if (yen > 0 || res === "") res += yen;
        return res + "円";
    };

    // --- Core Logic ---

    const calculate = () => {
        let age = parseFloat(ageInput.value);
        if (ageSecretBtn.classList.contains('active')) {
            age = 33;
        } else if (isNaN(age) || age <= 0) {
            alert("年齢を正しく入力してください。");
            return;
        }

        // Calculate weighted score
        const totalScore = Math.max(0, answers.reduce((sum, val, i) => {
            if (val === 1) return sum + QUESTIONS[i].points;
            return sum;
        }, 0));
        const dailyLossHours = (totalScore / MAX_SCORE) * 24;
        const annualLossHours = dailyLossHours * 365;
        const currentTotalLossHours = Math.floor(annualLossHours * age);
        const currentTotalLossDays = (currentTotalLossHours / 24).toFixed(1);
        const moneyLoss = Math.floor(currentTotalLossHours * 8 * LAB_CONFIG.hourlyWage);
        const benzCount = (moneyLoss / LAB_CONFIG.benzPrice).toFixed(2);
        const nihilityRate = ((totalScore / MAX_SCORE) * 100).toFixed(0);

        // UI Updates
        totalScoreText.textContent = totalScore;
        nihilityRateText.textContent = nihilityRate;
        dailyLossText.textContent = dailyLossHours.toFixed(1);
        totalLossTimeText.textContent = formatTime(currentTotalLossHours);
        totalLossDaysText.textContent = `（約 ${parseFloat(currentTotalLossDays).toLocaleString()} 日分）`;
        totalLossMoneyText.textContent = formatMoney(moneyLoss);
        benzCountText.textContent = benzCount;

        // Transitions
        inputForm.classList.add('hidden');
        resultArea.classList.remove('hidden');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Character Message
        const msg = LAB_CONFIG.messages[Math.floor(Math.random() * LAB_CONFIG.messages.length)];
        spiritMessage.style.opacity = 0;
        setTimeout(() => {
            spiritMessage.textContent = msg;
            spiritMessage.style.opacity = 1;
        }, 300);
    };

    const reset = () => {
        answers.fill(0);
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        ageInput.type = 'number';
        ageInput.value = '20';
        ageInput.disabled = false;
        ageSlider.disabled = false;
        ageSlider.value = '20';
        ageSlider.classList.remove('secret-active');
        ageSecretBtn.classList.remove('active');
        ageUnit.style.display = 'inline';
        inputForm.classList.remove('hidden');
        resultArea.classList.add('hidden');
        spiritMessage.textContent = "「次は何を無駄にしているか調べますか？ お手柔らかに。」";

        // Update slider progress on reset
        const updateSliderProgressReset = () => {
            const val = ageSlider.value;
            const min = parseFloat(ageSlider.min) || 1;
            const max = parseFloat(ageSlider.max) || 130;
            const percentage = ((val - min) / (max - min)) * 100;
            ageSlider.style.setProperty('--progress', `${percentage}%`);
        };
        updateSliderProgressReset();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const share = () => {
        const rate = nihilityRateText.textContent;
        const benz = benzCountText.textContent;
        const text = `【人生損失ラボ】私の人生の虚無率は ${rate}% でした。これまでの損失はベンツ ${benz} 台分に相当するようです。 #人生損失ラボ #損失ラボシリーズ`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    };

    // --- Listeners ---
    calcBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', reset);
    shareBtn.addEventListener('click', share);

    // Run init
    init();
    spiritMessage.style.transition = "opacity 0.3s ease";
});
