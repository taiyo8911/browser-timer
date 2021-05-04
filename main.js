//即時関数で囲う
(function () {

    //厳密なエラーチェックのための記述
    'use strict';

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    //スタートタイムを押した時の時間を入れる変数
    var startTime;

    //残り時間を計算するための変数
    var timeLeft;

    //とりあえず4秒で設定しておく。 現在時刻と表示形式を合わせるために * 1000
    var timeToCountDown = 0;

    //clearTimeoutメソッドを使いたいので、その時用に変数定義
    var timerId;

    //変数を用意し、カウントダウンの状態を管理できるようにする * Startの兼用
    var isRunning = false;

    //残り時間を表示するためにミリ秒を渡すと分とか秒に直してくれる関数を作る
    function updateTimer(t) {

        //引数として渡されたtでデータオブジェクトを作りたいので変数dという変数名で作ってみる
        var d = new Date(t);

        var m = d.getMinutes();
        var s = d.getSeconds();
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        timer.textContent = m + ':' + s;
        
        let title = timer.textContent = m + ':' + s;;
        document.title = title;

    }


    function countDown() {

        //setTimeoutを使って次の処理を10ミリ秒後に実行するようにする
        timerId = setTimeout(function () {

            //残り時間 = カウントされる時間 - 現在時刻
            timeLeft = timeToCountDown - (Date.now() - startTime);

            //残り時間が0になった時の処理をif文で記述する。
            if (timeLeft < 0) {
                isRunning = false;
                start.textContent = 'スタート';
                clearTimeout(timerId);
                timeLeft = 0;

                //カウントをリスタートした際にデフォ値の4秒にならないようにする
                timeToCountDown = 0;

                // updateTimer(timeLeft);
                updateTimer(timeLeft);

                return;
            }

            //countDownを再帰的に呼び出すためのに記述
            updateTimer(timeLeft)
            countDown();

            //1秒以下の時間も表示されるようにする
        }, 10);
    }

    //スタートを押した際に発火するイベント
    start.addEventListener('click', function () {

        if (isRunning === false) {
            isRunning = true;

            start.textContent = 'ストップ';
            
            startTime = Date.now();

            //カウントダウンの機能は再帰的に実行したいのでcountDown関数を入れとく
            countDown();
        } else {
            isRunning = false;

            //表記をStartに戻す
            start.textContent = 'スタート';

            //この時点のtimeLeftで更新してあげる
            timeToCountDown = timeLeft;

            //カウントを止めたいのでclearTimeoutする
            clearTimeout(timerId);
        }
    });

    //分を押した時の処理を記述
    min.addEventListener('click', function () {

        //カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        //分 = 60秒なので
        timeToCountDown += 60 * 1000;

        //60分、60秒を超えたら0にする
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    //秒を押した時の処理
    sec.addEventListener('click', function () {

        //カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        //60秒なので
        timeToCountDown += 1000;

        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });


    //リセットを押した時の処理
    reset.addEventListener('click', function () {

        //カウントダウン中に設定時間を変更できないようにする
        if (isRunning === true) {
            return;
        }

        //60秒なので
        timeToCountDown = 0;

        //timeToCountDownをtimerに反映させたいのでupDatetimerを使う
        updateTimer(timeToCountDown);
    });
})();