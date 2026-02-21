/**
 * Loss Lab Series: Life Loss Lab
 * Core logic for calculating time/money loss and managing UI states.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration (Easy to update for other labs) ---
    const LAB_CONFIG = {
        title: "人生損失ラボ",
        targetAge: 80,
        messages: [
            "ふむ、なかなかの浪費家ですね。あなたの人生、砂時計の穴が少し大きすぎるようです。",
            "時間は金なり、と言いますが。あなたの場合は砂のように指の間からこぼれ落ちているようですよ。",
            "その時間があれば、何ができたでしょうね？ まあ、過ぎたことは仕方がありませんが。",
            "虚無に捧げた時間。それはそれで、一つの贅沢かもしれませんね（皮肉です）。",
            "あなたの砂時計、底が見えてきてから慌てても遅いですよ。今のうちに現実に目を向けなさい。",
            "損失を可視化して、少しは目が覚めましたか？ まだ眠そうですね。"
        ],
        errorMessages: [
            "数値を正しく入力しなさい。あなたの思考まで止まってしまったのですか？",
            "年齢や時間は現実に即した数値で。あなたの夢の話を聞いているのではありません。"
        ]
    };

    // --- DOM Elements ---
    const ageInput = document.getElementById('age');
    const wastedTimeInput = document.getElementById('wasted-time');
    const hourlyWageInput = document.getElementById('hourly-wage');
    const calcBtn = document.getElementById('calc-btn');
    const resultArea = document.getElementById('result-area');
    const inputForm = document.querySelector('.input-form');
    
    const yearlyLossText = document.getElementById('yearly-loss');
    const totalLossTimeText = document.getElementById('total-loss-time');
    const totalLossMoneyText = document.getElementById('total-loss-money');
    const spiritMessage = document.getElementById('spirit-message');
    
    const shareBtn = document.getElementById('share-btn');
    const resetBtn = document.getElementById('reset-btn');

    // --- Core Logic ---

    const calculateLoss = () => {
        const age = parseFloat(ageInput.value);
        const wastedDaily = parseFloat(wastedTimeInput.value);
        const wage = parseFloat(hourlyWageInput.value || 0);

        // Validation
        if (isNaN(age) || isNaN(wastedDaily) || age < 0 || wastedDaily < 0 || wastedDaily > 24) {
            updateSpiritMessage(LAB_CONFIG.errorMessages[Math.floor(Math.random() * LAB_CONFIG.errorMessages.length)]);
            return;
        }

        const remainingYears = Math.max(0, LAB_CONFIG.targetAge - age);
        
        // Calculations
        const yearlyLoss = Math.floor(wastedDaily * 365);
        const totalLossTime = Math.floor(yearlyLoss * remainingYears);
        const totalLossMoney = Math.floor(totalLossTime * wage);

        // UI Updates
        yearlyLossText.textContent = yearlyLoss.toLocaleString();
        totalLossTimeText.textContent = totalLossTime.toLocaleString();
        
        if (wage > 0) {
            totalLossMoneyText.textContent = totalLossMoney.toLocaleString();
            document.getElementById('money-loss-card').classList.remove('hidden');
        } else {
            document.getElementById('money-loss-card').classList.add('hidden');
        }

        // Show Results
        inputForm.classList.add('hidden');
        resultArea.classList.remove('hidden');
        
        // Change Message
        updateSpiritMessage(LAB_CONFIG.messages[Math.floor(Math.random() * LAB_CONFIG.messages.length)]);
    };

    const updateSpiritMessage = (msg) => {
        spiritMessage.style.opacity = 0;
        setTimeout(() => {
            spiritMessage.textContent = msg;
            spiritMessage.style.opacity = 1;
        }, 200);
    };

    const resetTool = () => {
        resultArea.classList.add('hidden');
        inputForm.classList.remove('hidden');
        updateSpiritMessage("「次は何を無駄にしているか調べますか？ お手柔らかに。」");
    };

    const shareOnX = () => {
        const time = totalLossTimeText.textContent;
        const text = `【人生損失ラボ】私の今後の人生での「無駄時間」は合計 ${time} 時間でした。砂時計の精に「もっと現実を見ろ」と刺されました。 #損失ラボシリーズ #人生損失ラボ`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    };

    // --- Event Listeners ---
    calcBtn.addEventListener('click', calculateLoss);
    resetBtn.addEventListener('click', resetTool);
    shareBtn.addEventListener('click', shareOnX);

    // Initial message setup
    spiritMessage.style.transition = "opacity 0.3s ease";
});
