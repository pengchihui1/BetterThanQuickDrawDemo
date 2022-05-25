
start_button = document.getElementById('mainButton')

const pages = { "main": 1, "card": 2, "game": 3, "about": 4 }

var fractionNumber = 0 // 分數

var active_page = pages.main;

var drawing_index = -1
var drawing_history = []

function toggle_round_card(onlyOpen = false) {
    clearInterval(window.roundTimer)
    let desired_drawing_txt = document.getElementById('desired_drawing')
    let inner_desired_drawing_txt = document.getElementById('inner_desired_drawing')

    let card = document.getElementById('round-card')

    if (active_page != pages.card && active_page != pages.about || onlyOpen) {// 顯示卡片

        if (drawing_history.length > 20) {
            drawing_history.splice(0, 1);
        }

        drawing_index = Math.floor(Math.random() * Object.keys(labels).length)
        var i = 0
        while (i < drawing_history.length) {
            if (drawing_index == drawing_history[i]) {
                drawing_index = Math.floor(Math.random() * Object.keys(labels).length)
                i = -1
            }
            i++
        }
        drawing_history.push(drawing_index)

        desired_drawing_txt.textContent = labels[drawing_index];
        card.className = 'cover visible';

        // 倒計時
        window.roundNum = 5
        $('#start-btn').text(`開始（${window.roundNum}）`)
        window.roundTimer = setInterval(() => {
            window.roundNum -= 1
            $('#start-btn').text(`開始（${window.roundNum}）`)
            if (window.roundNum <= 0) {
                toggle_game_canvas()
            }
        }, 1000)

        setTimeout(function () {
            inner_desired_drawing_txt.textContent = 'Draw: ' + labels[drawing_index];

            init()
            stop_drawing() //遊戲結束計時
        }, 250)

        active_page = pages.card;
    }
    else {// 關閉卡片
        card.className = 'cover invisible'
    }
}

function toggle_game_canvas() {
    if (active_page != pages.game) {
        let game = document.getElementById('game-canvas')// 進入遊戲
        game.style.display = 'flex'
        toggle_round_card() // 關閉卡片
        active_page = pages.game;
        start_drawing() // 遊戲開始計時
    } else { // 關閉遊戲
        game = document.getElementById('game-canvas')
        game.style.display = 'none'
        stop_drawing() //遊戲結束計時
        active_page = pages.main;
    }

}

function toggle_about() {
    if (active_page != pages.about) { //顯示咨詢
        let about = document.getElementById('about')
        about.className = 'cover about visible';
        active_page = pages.about;
        return
    }
    if (active_page == pages.about) { //關閉咨詢
        let about = document.getElementById('about')
        about.className = 'cover about invisible';
        active_page = pages.main;
    }
}

function enter_main() {//回車進入遊戲 清除繪畫歷史
    toggle_game_canvas()
    drawing_history = []
}
