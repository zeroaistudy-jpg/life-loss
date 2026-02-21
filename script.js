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
        benzPrice: 12000000,
        hourlyWage: 1500,
        messages: [
            "ふむ、救いようのない虚無の達人ですね。あなたの人生、砂時計の穴が崩壊しているようです。",
            "時間は金なりと言いますが、あなたの場合は砂利のようにドブに捨てているようですよ。",
            "その損失で、ベンツが何台買えたことか。現実を見るのが怖くなりましたか？",
            "虚無に捧げた時間。それはそれで、王族のような贅沢な浪費癖ですね（皮肉です）。",
            "あなたの砂時計、底が見えなくなっていますよ。今のうちに目を覚ましなさい。",
            "損失を可視化して、少しは血の気が引きましたか？ まだ眠そうですね。"
        ]
    };

    // --- DOM Elements ---
    const ageInput = document.getElementById('age');
    const questionsList = document.getElementById('questions-list');
    const calcBtn = document.getElementById('calc-btn');
    const resultArea = document.getElementById('result-area');
    const inputForm = document.querySelector('.input-form');

    const totalScoreText = document.getElementById('total-score');
    const dailyLossText = document.getElementById('daily-loss');
    const totalLossTimeText = document.getElementById('total-loss-time');
    const totalLossMoneyText = document.getElementById('total-loss-money');
    const benzCountText = document.getElementById('benz-count');
    const topLossItemText = document.getElementById('top-loss-item');
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
    };

    // --- Core Logic ---

    const calculate = () => {
        const age = parseFloat(ageInput.value);
        if (isNaN(age) || age <= 0) {
            alert("年齢を正しく入力してください。");
            return;
        }

        const totalScore = Math.max(0, answers.reduce((a, b) => a + b, 0));
        const dailyLossHours = totalScore * 0.5;
        const annualLossHours = dailyLossHours * 365;
        const lifetimeLossHours = Math.floor(annualLossHours * (80 / age));
        const moneyLoss = Math.floor(lifetimeLossHours * 8 * LAB_CONFIG.hourlyWage);
        const benzCount = (moneyLoss / LAB_CONFIG.benzPrice).toFixed(2);

        // Highlight top loss item (find first "Yes")
        const topLossIndex = answers.indexOf(1);
        const topLossItem = topLossIndex !== -1 ? QUESTIONS[topLossIndex] : "特になし（虚無の極み）";

        // UI Updates
        totalScoreText.textContent = totalScore;
        dailyLossText.textContent = dailyLossHours.toFixed(1);
        totalLossTimeText.textContent = lifetimeLossHours.toLocaleString();
        totalLossMoneyText.textContent = moneyLoss.toLocaleString();
        benzCountText.textContent = benzCount;
        topLossItemText.textContent = topLossItem;

        // Transitions
        inputForm.classList.add('hidden');
        resultArea.classList.remove('hidden');
        resultArea.scrollIntoView({ behavior: 'smooth' });

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
        ageInput.value = '';
        inputForm.classList.remove('hidden');
        resultArea.classList.add('hidden');
        spiritMessage.textContent = "「次は何を無駄にしているか調べますか？ お手柔らかに。」";
    };

    const share = () => {
        const benz = benzCountText.textContent;
        const text = `【人生損失ラボ】私の今後の無駄時間は「ベンツ ${benz} 台分」の損失に相当するようです。砂時計の精に現実を突きつけられました。 #人生損失ラボ #損失ラボシリーズ`;
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
