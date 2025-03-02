document.addEventListener("DOMContentLoaded", function () {
    // タイプライター風 Intro 表示
    const introText = "はじめまして中野宏洋です";
    const introElement = document.getElementById("intro-text");
    let idx = 0;
    function typeEffect() {
      if (idx < introText.length) {
        introElement.textContent += introText.charAt(idx);
        idx++;
        setTimeout(typeEffect, 100);
      } else {
        setTimeout(() => {
          document.getElementById("intro").style.display = "none";
          document.getElementById("content").style.display = "block";
        }, 1000);
      }
    }
    typeEffect();
  
    // 各面ごとに対応するセル用テキスト（8個）を定義
    const explanationsMapping = {
      "自己紹介": {
        cells: [
          "<img src='images/perfect.JPG' alt='自然画像' style='max-width:100%; height:auto;'>",
          "趣味<br>映画鑑賞。最近面白かったのは、「PERFECT DAYS」。中華料理を作るのも好きでマイ中華鍋を持っている。",
          "<img src='images/profile.JPG' alt='プロフィール画像' style='max-width:100%; height:auto;'>",
          "基本情報<br>生まれも育ちも熊本県熊本市。てんびん座のB型。好きな場所は自然が多い田舎。",
          "自己紹介のテキスト5",
          "<img src='images/cuisine.JPG' alt='料理画像' style='max-width:100%; height:auto;'>",
          "経歴<br>佐賀大学理工学部知能情報システム学科卒。現在は、社内SEとして日々働いている。",
          "<img src='images/record.JPG' alt='自然画像' style='max-width:100%; height:auto;'>",
        ]
      },
      "経歴": {
        cells: [
          "経歴のテキスト1",
          "経歴のテキスト2",
          "経歴のテキスト3",
          "経歴のテキスト4",
          "経歴のテキスト5",
          "経歴のテキスト6",
          "経歴のテキスト7",
          "経歴のテキスト8"
        ]
      },
      "依頼": {
        cells: [
          "依頼のテキスト1",
          "依頼のテキスト2",
          "依頼のテキスト3",
          "依頼のテキスト4",
          "依頼のテキスト5",
          "依頼のテキスト6",
          "依頼のテキスト7",
          "依頼のテキスト8"
        ]
      },
      "プロダクト": {
        cells: [
          "プロダクトのテキスト1",
          "プロダクトのテキスト2",
          "プロダクトのテキスト3",
          "プロダクトのテキスト4",
          "プロダクトのテキスト5",
          "プロダクトのテキスト6",
          "プロダクトのテキスト7",
          "プロダクトのテキスト8"
        ]
      },
      "？": {
        cells: [
          "？のテキスト1",
          "？のテキスト2",
          "？のテキスト3",
          "？のテキスト4",
          "？のテキスト5",
          "？のテキスト6",
          "？のテキスト7",
          "？のテキスト8"
        ]
      }
    };
  
    // face 要素（3D キューブの各面）クリック時の処理
    document.querySelectorAll(".face").forEach(face => {
      face.addEventListener("click", function () {
        // クリックされた面のテキスト（キー）を取得
        const faceKey = face.textContent.trim();
        const explanation =
          explanationsMapping[faceKey] || explanationsMapping["自己紹介"];
        const texts = explanation.cells; // セル用テキスト配列
  
        // 生成前に cube-container 内をクリア
        const container = document.getElementById("cube-container");
        container.innerHTML = "";
        // キューブ群が表示される間は、戻るボタン用にポインターイベントを有効にする
        container.style.pointerEvents = "auto";
  
        // 各セルの最終配置位置（グリッド）：上段は top:0vh、下段は top:50vh、横は left:0%,25%,50%,75%
        const finalPositions = [
          { left: 0, top: 0 },    // セル①
          { left: 25, top: 0 },   // セル②
          { left: 50, top: 0 },   // セル③
          { left: 75, top: 0 },   // セル④
          { left: 0, top: 50 },   // セル⑤ ←「戻る」ボタンを配置する対象
          { left: 25, top: 50 },  // セル⑥
          { left: 50, top: 50 },  // セル⑦
          { left: 75, top: 50 }   // セル⑧
        ];
        // 落下順：6→8→7→5→4→2→1→3 (0-index: [5,7,6,4,3,1,0,2])
        const fallingOrder = [5, 7, 6, 4, 3, 1, 0, 2];
  
        fallingOrder.forEach((finalIndex, orderIdx) => {
          const cube = document.createElement("div");
          cube.classList.add("falling-cube");
          cube.style.width = "25%";    // 25% 幅
          cube.style.height = "50vh";   // 50vh 高さ
          cube.style.left = finalPositions[finalIndex].left + "%";
          cube.style.top = "-50vh"; // 初期位置は画面上部外
  
          if (finalIndex === 4) {
            cube.innerHTML = ""; // セル⑤はテキストを表示しない
            const backBtn = document.createElement("button");
            backBtn.classList.add("back-btn");
            backBtn.textContent = "戻る";
            cube.appendChild(backBtn);
  
            // 戻るボタンをクリックした際の処理
            backBtn.addEventListener("click", function (event) {
              event.stopPropagation(); // クリックの伝搬を防止
  
              const allCubes = document.querySelectorAll(".falling-cube");
              allCubes.forEach(c => {
                c.style.transition = "left 1s ease-in-out, opacity 1s ease-in-out";
                c.style.left = "-100%";
                c.style.opacity = "0";
              });
  
              setTimeout(() => {
                container.innerHTML = "";
                container.style.pointerEvents = "none";
              }, 1000);
            });
          } else {
            // innerHTML を使うことで、セル内に記述した <br> などの HTML タグが有効になります
            cube.innerHTML = texts[finalIndex];
          }
  
          cube.style.transition = "top 1.5s ease-in-out";
          container.appendChild(cube);
  
          const delay = orderIdx * 300;
          setTimeout(() => {
            cube.style.top = finalPositions[finalIndex].top + "vh";
          }, delay);
        });
      });
    });
  });
  