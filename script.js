/**
 * Loss Lab Series: Life Loss Lab
 * Quiz format: 20 Questions about time wasting habits.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const QUESTIONS = [
        "よく意味もなくスマホをいじっている",
        "よく本当にやりたいゲーム以外もプレイしている",
        "よく見るものがないのに動画をつけっぱなしにしている",
        "よくSNSを見すぎて時間を忘れてしまう",
        "よく通知に追われて無駄にスクロールしている",
        "よく予定がないのに二度寝してしまう",
        "よく見るものないのにテレビをだらだら見ている",
        "よくゴロゴロして無駄に過ごしている",
        "よく食べながら何もせずスマホを見ている",
        "よく何となく寝転んでスマホを触っている",
        "よくやろうと思って後回しにしている",
        "よく無計画に休日を過ごしている",
        "よく作業を中断してダラダラしてしまう",
        "よく必要以上に休憩して時間を浪費している",
        "よく先延ばししてやらなくて後悔している",
        "よく通勤・移動中にスマホで無駄時間を過ごしている",
        "よく買い物中に無駄に歩き回って時間を消費している",
        "よく待ち時間に何もせずボーッとしている",
        "よくメールやチャットをダラダラ読んでいる",
        "よく会議や講義中に集中せずスマホを触っている"
    ];

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
    const ageSecretBtn = document.getElementById('age-secret-btn');
    const ageUnit = document.getElementById('age-unit');
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
                <p class="question-text">${index + 1}. ${q}</p>
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

        ageSecretBtn.addEventListener('click', () => {
            const isActive = ageSecretBtn.classList.toggle('active');
            if (isActive) {
                // Save current numeric value
                ageInput.dataset.prevVal = ageInput.value;
                ageInput.type = 'text';
                ageInput.value = '秘密';
                ageInput.disabled = true;
                ageUnit.style.display = 'none';
            } else {
                ageInput.type = 'number';
                // Restore previous numeric value
                ageInput.value = ageInput.dataset.prevVal || 20;
                ageInput.disabled = false;
                ageUnit.style.display = 'inline';
            }
        });
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

        const totalScore = Math.max(0, answers.reduce((a, b) => a + b, 0));
        const dailyLossHours = totalScore * 0.5;
        const annualLossHours = dailyLossHours * 365;
        const currentTotalLossHours = Math.floor(annualLossHours * age);
        const currentTotalLossDays = (currentTotalLossHours / 24).toFixed(1);
        const moneyLoss = Math.floor(currentTotalLossHours * 8 * LAB_CONFIG.hourlyWage);
        const benzCount = (moneyLoss / LAB_CONFIG.benzPrice).toFixed(2);
        const nihilityRate = ((totalScore / 20) * 100).toFixed(0);

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
        ageSecretBtn.classList.remove('active');
        ageUnit.style.display = 'inline';
        inputForm.classList.remove('hidden');
        resultArea.classList.add('hidden');
        spiritMessage.textContent = "「次は何を無駄にしているか調べますか？ お手柔らかに。」";

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
