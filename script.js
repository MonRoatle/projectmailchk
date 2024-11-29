function showStage(stageNum) {
    const stages = document.querySelectorAll('.stage');
    const buttons = document.querySelectorAll('.tab-button');

    stages.forEach((stage, index) => {
        stage.classList.add('hidden');
        buttons[index].classList.remove('active');
    });

    document.getElementById(`stage${stageNum}`).classList.remove('hidden');
    buttons[stageNum - 1].classList.add('active');
}

function checkAnswer(stage, choice) {
    const feedback = document.getElementById(`feedback${stage}`);
    const correctAnswers = {
        1: 3, // 差出人メールアドレスが怪しい
        2: 3, // 偽ログイン画面を見抜く
        3: 1, // 不審なアンケートを判定する
        4: 4  // 公式サイトを確認する
    };

    // ステージ2と3の特別な条件
    if (stage === 2 || stage === 3) {
        const inputs = document.querySelectorAll(`#stage${stage} input`);
        for (let input of inputs) {
            if (input.value.trim() !== "") {
                feedback.textContent = "不正解です。個人情報を入力してはいけません！";
                feedback.className = "feedback incorrect";
                feedback.style.display = "block";
                return;
            }
        }
    }

    if (choice === correctAnswers[stage]) {
        feedback.textContent = "正解です！次のステージに進みます。";
        feedback.className = "feedback correct";

        const nextStage = stage + 1;
        if (nextStage <= 4) {
            // 有効化されたタブボタンをクリックして次のステージへ進む
            setTimeout(() => {
                document.querySelectorAll('.tab-button')[nextStage - 1].disabled = false;
                showStage(nextStage);
            }, 2000); // 2秒後に進む
        } else {
            feedback.textContent = "正解です！すべてのステージをクリアしました！";
        }
    } else {
        feedback.textContent = "不正解です。もう一度考えてみましょう。";
        feedback.className = "feedback incorrect";
    }

    feedback.style.display = "block";
}
