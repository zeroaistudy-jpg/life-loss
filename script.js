/**
 * 虚無ラボ(void_lab): 虚無の領収書
 * Quiz format: 20 Questions about time wasting habits.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const QUESTIONS = [
        { text: "たまにさっきまで何をしていたか忘れる", points: 4 },
        { text: "「明日から本気出す」を実行できたことがない", points: 5 },
        { text: "惰性でゲームを続けてしまう", points: 2 },
        { text: "風呂に入るまでに無駄に時間がかかる", points: 2 },
        { text: "何度も同じ場所をウロウロする", points: 2 },
        { text: "暇になるとすぐスマホを開く", points: 3 },
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

    const SPIRIT_TIERS = [
        { max: 4, title: "砂の初心者", msg: "あなたの時間、まだ澄んだ砂のままですね。虚無の影はほとんど見えません。" },
        { max: 8, title: "軽度の時間迷子", msg: "少しだけ砂がこぼれていますが、まだ取り返しはつきますよ。今なら余裕です。" },
        { max: 12, title: "日常虚無の住人", msg: "ふむ、小さな虚無が積もっていますね。気づけば山になる前に、そっと払っておきましょう。" },
        { max: 16, title: "ゆるい虚無の旅人", msg: "あなたの時間、ちょっとずつ蒸発してますね。まあ、人間らしくて嫌いじゃないですよ。" },
        { max: 20, title: "静かに砂を落とす者", msg: "砂時計の砂が、あなたの隙間から静かに漏れています。まだ笑って済む範囲です。" },
        { max: 24, title: "虚無の習慣者", msg: "おや、虚無のパターンが安定してきましたね。これはもう\"習慣\"と言っていいでしょう。" },
        { max: 28, title: "時間漏洩の常連", msg: "あなたの人生、ところどころ砂が抜け落ちています。補修工事をおすすめします。" },
        { max: 32, title: "虚無の熟練工", msg: "ここまで虚無を積み上げるとは…なかなかの腕前ですね。砂時計の精も感心しています。" },
        { max: 36, title: "虚無の美学者", msg: "あなたの時間の使い方、もはや芸術の域です。虚無の美学すら感じますよ。" },
        { max: 40, title: "砂時計の異常値", msg: "砂が落ちる音が聞こえます。あなたの時間、静かに虚空へ吸い込まれていますね。" },
        { max: 44, title: "虚無の達人", msg: "これは見事な虚無の積み上げ。あなたの人生の軌跡、砂の線で描けそうです。" },
        { max: 48, title: "時間蒸発の名匠", msg: "あなたの時間、ほとんど\"蒸発\"していますね。砂時計の精も少し心配になってきました。" },
        { max: 52, title: "浪費の王族", msg: "ここまで虚無を捧げるとは…王族のような贅沢な浪費の歴史ですね（皮肉です）。" },
        { max: 56, title: "虚無の深淵歩行者", msg: "あなたの砂時計、ほぼ空洞です。過去の時間は二度と戻りませんよ、念のため。" },
        { max: 60, title: "虚無の化身", msg: "虚無の積み上げ方が尋常ではありません。あなたの人生、砂が虚空に吸われ続けています。" },
        { max: 64, title: "無", msg: "あなたの砂時計は、完全に沈黙しました。砂が落ちる音すら消え、ただ\"無\"だけが残っています。" }
    ];

    const LAB_CONFIG = {
        title: "虚無の領収書 - 虚無への問い",
        benzPrice: 15000000,
        hourlyWage: 1200
    };

    // --- DOM Elements ---
    const ageInput = document.getElementById('age');
    const questionsList = document.getElementById('questions-list');
    const calcBtn = document.getElementById('calc-btn');
    const resultArea = document.getElementById('result-area');
    const inputForm = document.querySelector('.input-form');
    const choicesList = document.getElementById('choices-list');

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
        const dailyLossHours = (totalScore / MAX_SCORE) * 12;
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

        // Populate Choices Summary
        choicesList.innerHTML = '';
        QUESTIONS.forEach((q, i) => {
            const answerVal = answers[i];
            let answerText = "未回答";
            let answerClass = "answer-unanswered";

            if (answerVal === 1) {
                answerText = "はい";
                answerClass = "answer-yes";
            } else if (answerVal === 0) {
                answerText = "どちらでもない";
                answerClass = "answer-neutral";
            } else if (answerVal === -1) {
                answerText = "いいえ";
                answerClass = "answer-no";
            }

            const choiceItem = document.createElement('div');
            choiceItem.className = 'choice-item';
            choiceItem.innerHTML = `
                <span class="choice-number">${i + 1}.</span>
                <span class="choice-text">${q.text}</span>
                <span class="choice-answer ${answerClass}">${answerText}</span>
            `;
            choicesList.appendChild(choiceItem);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Character Message - score-based tier
        const tier = SPIRIT_TIERS.find(t => totalScore <= t.max) || SPIRIT_TIERS[SPIRIT_TIERS.length - 1];
        spiritMessage.style.opacity = 0;
        setTimeout(() => {
            spiritMessage.innerHTML = `<strong>称号：${tier.title}</strong><br>「${tier.msg}」`;
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
        const text = `【虚無の領収書】私の人生の虚無率は ${rate}% でした。これまでの虚無はベンツ ${benz} 台分に相当するようです。 #虚無の領収書 #虚無ラボ`;
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
