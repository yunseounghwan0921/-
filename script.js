let score = 0;
        let gameActive = false;
        let timerId = null;
        let endTimeoutId = null;

        // 점수 표시 엘리먼트가 없으면 생성해서 왼쪽 위에 고정
        function ensureScoreDisplay() {
            let scoreDisplay = document.getElementById('score');
            if (!scoreDisplay) {
                scoreDisplay = document.createElement('div');
                scoreDisplay.id = 'score';
                scoreDisplay.style.position = 'fixed';
                scoreDisplay.style.top = '10px';
                scoreDisplay.style.left = '10px';
                scoreDisplay.style.background = 'rgba(255,255,255,0.8)';
                scoreDisplay.style.padding = '8px 16px';
                scoreDisplay.style.borderRadius = '8px';
                scoreDisplay.style.fontSize = '18px';
                scoreDisplay.style.fontWeight = 'bold';
                scoreDisplay.style.zIndex = '1000';
                document.body.appendChild(scoreDisplay);
            }
            scoreDisplay.textContent = '점수: ' + score;
            return scoreDisplay;
        }

        function moveButton() {
            if (!gameActive) return;
            const btn = document.getElementById('myButton');
            const scoreDisplay = ensureScoreDisplay();
            const btnWidth = btn.offsetWidth;
            const btnHeight = btn.offsetHeight;
            const maxX = window.innerWidth - btnWidth;
            const maxY = window.innerHeight - btnHeight;
            const randX = Math.random() * maxX;
            const randY = Math.random() * maxY;
            btn.style.position = 'absolute';
            btn.style.left = randX + 'px';
            btn.style.top = randY + 'px';

            // 점수 10점씩 증가
            score += 10;
            if (scoreDisplay) {
                scoreDisplay.textContent = '점수: ' + score;
            }
        }

        function startGame(seconds) {
            // 초기화
            score = 0;
            gameActive = true;
            ensureScoreDisplay();
            document.getElementById('score').style.display = 'block';
            document.getElementById('final-score').textContent = '';
            const btn = document.getElementById('myButton');
            btn.style.display = 'inline-block';
            moveButton();

            // 시간 버튼 숨기기
            document.querySelectorAll('.timer-btn').forEach(el => el.style.display = 'none');

            // 버튼 활성화
            btn.disabled = false;

            // 타이머 종료 예약
            if (endTimeoutId) clearTimeout(endTimeoutId);
            endTimeoutId = setTimeout(endGame, seconds * 1000);

            // 버튼이 계속 움직이도록 하려면 아래 코드 사용 (선택사항)
            // if (timerId) clearInterval(timerId);
            // timerId = setInterval(moveButton, 1000); // 1초마다 자동 이동
        }

        function endGame() {
            gameActive = false;
            document.getElementById('myButton').style.display = 'none';
            document.getElementById('score').style.display = 'none';
            document.getElementById('final-score').textContent = `게임 종료! 당신의 점수는 ${score}점 입니다.`;

            // 시간 버튼 다시 보이기
            document.querySelectorAll('.timer-btn').forEach(el => el.style.display = 'inline-block');
        }