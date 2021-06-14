'use strict'
{
  const hp = document.getElementById('hp');
  const ehp = document.getElementById('e_hp');
  const message = document.getElementById('message');
  const system = document.getElementById('system');
  const choice = document.getElementById('choice');
  const status = document.getElementById('status');
  const estatus = document.getElementById('e_status');
  const hName = document.getElementById('heroName');
  const eName = document.getElementById('enemyName');
  const hero = document.getElementById('hero');
  const enemy = document.getElementById('enemy');

  const li = document.createElement('li');

  let bossEncount = false;
  let bossCount = false;

  let fountenEncount = false;
  let fountenclear = false;

  let yourName = 'あなた';
  hName.textContent = yourName;



  let currentHp = 100;
  hp.textContent = `HP ${currentHp}`;

    function nowHp() {
    hp.textContent = `HP ${currentHp}`;
  };

  // function typewriter(text, window) {
  //   text.split("").forEach((moji, index) => {
  //     setTimeout(() => {
  //       window.innerHTML += moji;
  //     }, 50 * index);
  //   });
  // }

  function stopChoice(text) {
    console.log('選択肢をオフにします');
    choice.classList.add('btn_off');
    setTimeout(() => {
      console.log('選択肢をオンにします');
      choice.classList.remove('btn_off');
    }, 50 * text.length);
  };

  function stopChoice2(text,textSystem) {
    choice.classList.add('btn_off');
    setTimeout(() => {
      choice.classList.remove('btn_off');
    }, 50 * (text.length + textSystem.length));
  };



  function typewriter(text, window,text2,window2) {
    text.split("").forEach((moji, index) => {
      setTimeout(() => {
        window.innerHTML += moji;
      }, 50 * index);
    });

    if (text2,window2 !== undefined) {
      setTimeout(() => {
        text2.split("").forEach((moji, index) => {
          setTimeout(() => {
            window2.innerHTML += moji;
          }, 50 * index);
      });
      }, 50 * text.length);
    } else {
      return
    };
  }

  function windowReset(window) {
    while (window.firstChild) {
      window.removeChild(window.firstChild);
    };
  }

  function allReset() {
    windowReset(message);
    windowReset(choice);
    windowReset(system);
  }

/*-----------------------------------------------------------------*/

  function startadv() { /*- 00スタート前 -*/
    allReset();
    hero.style.background = 'bottom/contain url(../img/job_tanken_koukogaku2.png)';
    const text = '冒険の準備はよろしいですか？'
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 2; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        li.textContent = 'いざダンジョンへ'
        li.addEventListener('click', () => {
          startadv_Y();
        });
      } else {
        li.textContent = 'もう少し準備を'
        li.addEventListener('click', () => {
          startadv_N()
        });
      }
      choice.appendChild(li);
    }

    function startadv_Y() { /*- 00スタート前 Y -*/
      allReset();
      const text = `${yourName}の目の前で巨大なダンジョンの扉が大きな口を開けている`
      typewriter(text,message);
      stopChoice(text);
      const li = document.createElement('li');
        li.textContent = '足を踏み入れる'
        li.addEventListener('click', () => {
          inDungeon();
        });
        choice.appendChild(li);
    }
    function startadv_N() { /*- 00スタート前 N -*/
      allReset();
      const text = `${yourName}は入念な準備を済ませて再びダンジョンの入り口に立った`
      const textSystem = 'HP + 20'
      typewriter(text,message,textSystem,system);
      stopChoice2(text,textSystem);
      const li = document.createElement('li');
        li.textContent = '足を踏み入れる'
        li.addEventListener('click', () => {
          inDungeon();
        });
        choice.appendChild(li);
        currentHp += 20;
        nowHp();
    }
  }

/*-----------------------------------------------------------------*/

  function inDungeon() { /*- 01ダンジョン -*/
    allReset();
    const text = '道は二手に分かれている'
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 2; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        li.textContent = '左へ行く'
        li.addEventListener('click', () => {
          inFounten();
        });
      } else {
        li.textContent = '右へ行く'
        li.addEventListener('click', () => {
          encount();
        });
      }
      choice.appendChild(li);
    }
  }

/*-----------------------------------------------------------------*/

  function treasure() {
    allReset();
    let text = `部屋に足を踏み入れた${yourName}は怪しい箱に目を奪われた`; 
    let textSystem = ''; 
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        if (bossEncount === true) {
          li.textContent = 'がいこつ騎士の部屋に引き返す';
          li.addEventListener('click', () => {
            encount();
          });
        } else {
          li.textContent = '左に引き返す';
          li.addEventListener('click', () => {
            encount();
          });
        }
      } else if (i === 1)　{
        li.textContent = '詳しく調べる';
        li.addEventListener('click', () => {

        });
      } else {
        if (fountenEncount === true) {
          li.textContent = '泉の部屋に引き返す';
          li.addEventListener('click', () => {
            inFounten();
          });
        } else {
          li.textContent = '左に引き返す';
          li.addEventListener('click', () => {
            inFounten();
          });
        }
      }
        choice.appendChild(li);
    }
  };

/*-----------------------------------------------------------------*/

  function encount() {  //戦闘開始
    bossEncount = true;
    let currentEhp = 60;
    let text = '';
    let textSystem = '';
    eName.textContent = 'がいこつ騎士'
    function nowEhp() {
      ehp.textContent = `HP ${currentEhp}`;
    };
    function battle() {
      for (let i = 0; i < 2; i++) {
        const li = document.createElement('li');
        if (i === 0) {
          li.textContent = 'たたかう'
          li.addEventListener('click', () => {
            if (li.classList.contains('btn_off')) {
              return;
            } else {
              if (currentEhp <= 0) {
                return;
              } else {
                choice.classList.add('btn_off');
                currentEhp -= 30;
                text = `${yourName}の攻撃`;
                textSystem = 'がいこつ騎士に 30 のダメージ！'
                nowEhp();
                windowReset(message);
                windowReset(system);
                typewriter(text,message,textSystem,system);
                if (currentEhp <= 0) {
                  ehp.classList.add('death');
                  eName.classList.add('death');
                }
                setTimeout(() => {
                  if (currentEhp <= 0) {
                    choice.classList.remove('btn_off');
                    windowReset(message);
                    windowReset(system);
                    windowReset(choice);
                    estatus.classList.add('hidden');
                    ehp.classList.remove('death');
                    eName.classList.remove('death');
                    li.textContent = '先に進む';
                    li.addEventListener('click', () => {
                      treasure();
                      });
                    choice.appendChild(li);
                    bossCount = !bossCount;
                    console.log(bossCount);
                    text = 'がいこつ騎士を倒した！';
                    textSystem = '金色の鍵を手に入れた！'
                    typewriter(text,message,textSystem,system);
                  } else {
                    currentHp -= 20; 
                    text = 'がいこつ騎士の攻撃';
                    textSystem = `${yourName}に 20 のダメージ！`;
                    nowHp();
                    windowReset(message);
                    windowReset(system);
                    typewriter(text,message,textSystem,system);
                    setTimeout(() => {
                      choice.classList.remove('btn_off');
                    }, 50 * (text.length + textSystem.length));
                  }
                }, 50 * (text.length + textSystem.length) + 1000);
              }
            }
          });
        } else {
          li.textContent = 'にげる'
          li.addEventListener('click', () => {
          });
        }
        console.log(i);
        choice.appendChild(li);
      };
    };

    if (bossCount === true) {
      allReset();
      text = 'がいこつ騎士の残骸が転がっている';
      typewriter(text,message);
      stopChoice(text);
      for (let i = 0; i < 2; i++) {
        const li = document.createElement('li');
        if (i === 0) {
          li.textContent = '先に進む';
          li.addEventListener('click', () => {
            treasure();
          });
        } else {
          li.textContent = '別れ道まで戻る';
          li.addEventListener('click', () => {
            inDungeon();
          });
        }
        choice.appendChild(li);
      }

    } else {
      allReset();
      text = 'がいこつ騎士が現れた！';
      textSystem = '';
      estatus.classList.remove('hidden');
      enemy.style.background = 'bottom/contain url(../img/gaikotsu_character.png)';
      typewriter(text,message)
      stopChoice(text);
      nowEhp();
      battle();
    };
  };

/*-----------------------------------------------------------------*/

  function inFounten() {
    fountenEncount = true;
    allReset()
    let text = '部屋の中心部に深く水をたたえた泉がある';
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        li.textContent = '分かれ道に引き返す';
        li.addEventListener('click', () => {
          allReset();
          inDungeon();
        });
      } else if(i === 1) {
        li.textContent = '詳しく調べる';
        li.addEventListener('click', () => {
          tryFounten();
        });
      } else {
        li.textContent = '先へ進む';
        li.addEventListener('click', () => {
          treasure();
        });
      }
      choice.appendChild(li);
    }
  };

/*-----------------------------------------------------------------*/

  function tryFounten() {
    allReset();
    let text = "美しい泉だ"
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        li.textContent = '入り口に戻る';
        li.addEventListener('click', () => {
          inFounten();
        });
      } else if(i === 1) {
        li.textContent = '飲んでみる';
        li.addEventListener('click', () => {

        });
      } else {
        li.textContent = '飛び込んでみる';
        li.addEventListener('click', () => {

        });
      }
      choice.appendChild(li);
    }
  };

/*-----------------------------------------------------------------*/
/*-----------------------------------------------------------------*/

  startadv();
  // encount();
  // inFounten();
}
