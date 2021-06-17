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

  let bossEncount = false; //がいこつ騎士と出会った
  let goldenKey = false;//金の鍵を手に入れた

  let fountenEncount = false;//泉を見つけた
  let drink = 0;//泉の水を飲んだ回数
  let goldenRing = false;//金のリングを手に入れた

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
    choice.classList.add('btn_off');
    setTimeout(() => {
      choice.classList.remove('btn_off');
    }, 50 * text.length);
  };

  function stopChoice2(text,textSystem) {
    choice.classList.add('btn_off');
    setTimeout(() => {
      choice.classList.remove('btn_off');
    }, 50 * (text.length + textSystem.length));
  };



  function typewriter(text, window = message,text2,window2 = system) {
    text.split("").forEach((moji, index) => {
      setTimeout(() => {
        window.innerHTML += moji;
      }, 50 * index);
    });

    if (text2&&window2 !== undefined) {
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
    windowReset(system);
    windowReset(choice);
  }

/*-----------------------------------------------------------------*/

  function startadv() { /*- 00スタート前 -*/
    allReset();
    // hero.style.background = 'bottom/contain url(../img/job_tanken_koukogaku2.png)';
    const text = '冒険の準備はよろしいですか？'
    typewriter(text);
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

  function hole() {
    allReset();
    let text = `とても広く空っぽの部屋に出た。向こうに小さな扉が見える`; 
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
        li.textContent = '先へ進む';
        li.addEventListener('click', () => {
          tresure();
        });
      } else {
        if (fountenEncount === true) {
          li.textContent = '泉の部屋に引き返す';
          li.addEventListener('click', () => {
            inFounten();
          });
        } else {
          li.textContent = '右に引き返す';
          li.addEventListener('click', () => {
            inFounten();
          });
        }
      }
        choice.appendChild(li);
    }
  };
/*-----------------------------------------------------------------*/

  function tresure() {
    allReset();
    let text = `とても広く空っぽの部屋に出た。向こうに小さな扉が見える`; 
    let textSystem = ''; 
    typewriter(text,message);
    stopChoice(text);
  }

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
            const hAttack =  Math.floor(Math.random() * 21) + 10;
            const eAttack =  Math.floor(Math.random() * 6) + 10;
            if (li.classList.contains('btn_off')) {
              return;
            } else {
              if (currentEhp <= 0) {
                return;
              } else {
                choice.classList.add('btn_off');
                currentEhp -= hAttack;
                text = `${yourName}の攻撃`;
                textSystem = `がいこつ騎士に ${hAttack} のダメージ！`
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
                      hole();
                      });
                    choice.appendChild(li);
                    goldenKey = !goldenKey;
                    text = 'がいこつ騎士を倒した！';
                    textSystem = '金色の鍵を手に入れた！'
                    typewriter(text,message,textSystem,system);
                  } else {
                    currentHp -= eAttack; 
                    text = 'がいこつ騎士の攻撃';
                    textSystem = `${yourName}に ${eAttack} のダメージ！`;
                    nowHp();
                    windowReset(message);
                    windowReset(system);
                    typewriter(text,message,textSystem,system);
                    stopChoice2(text,textSystem);
                    if (currentHp <= 0) {
                      allReset();
                      setTimeout(() => {
                        allReset();
                        estatus.classList.add('hidden');
                        status.classList.add('hidden');
                        text = `${yourName}は生き絶えた。長い年月をかけて骨だけになったその骸は、いつしか意思を持つようになったとかならないとか……`;
                        let textSystem = 'G A M E O V E R';
                        typewriter(text,message,textSystem,system);
                      }, 50 * (text.length + textSystem.length) + 1000);
                    }
                  }
                }, 50 * (text.length + textSystem.length) + 1000);
              }
            }
          });
        } else {
          li.textContent = 'にげる'
          li.addEventListener('click', () => {
            const runNumber = Math.floor(Math.random() * 2);
            if(runNumber === 0) {
              text = `${yourName}は隙を突いて逃げ出した`
              textSystem = '1234567890'//時間調節用
              windowReset(message);
              windowReset(system);
              typewriter(text,message);
              stopChoice2(text,textSystem);
              setTimeout(() => {
                estatus.classList.add('hidden');
                inDungeon()
              }, 50 * (text.length + textSystem.length));
            } else {
              const eAttack =  Math.floor(Math.random() * 16) + 5;
              windowReset(message);
              windowReset(system);
              text = '回り込まれてしまった！';
              textSystem = '1234567890'//時間調節用
              typewriter(text,message);
              stopChoice2(text,textSystem);
              windowReset(message);
              setTimeout(() => {
                currentHp -= eAttack; 
                text = 'がいこつ騎士の攻撃';
                textSystem = `${yourName}に ${eAttack} のダメージ！`;
                nowHp();
                windowReset(message);
                windowReset(system);
                typewriter(text,message,textSystem,system);
                stopChoice2(text,textSystem);
                if (currentHp <= 0) {
                  allReset();
                  setTimeout(() => {
                    allReset();
                    estatus.classList.add('hidden');
                    status.classList.add('hidden');
                    text = `${yourName}は生き絶えた。長い年月をかけて骨だけになったその骸は、いつしか意思を持つようになったとかならないとか……`;
                    let textSystem = 'G A M E O V E R';
                    typewriter(text,message,textSystem,system);
                  }, 50 * (text.length + textSystem.length) + 1000);
                }
              }, 50 * (text.length　+　textSystem.length));
            }
          });
        }
        choice.appendChild(li);
      };
    };

    if (goldenKey === true) {
      allReset();
      text = 'がいこつ騎士の残骸が転がっている';
      typewriter(text,message);
      stopChoice(text);
      for (let i = 0; i < 2; i++) {
        const li = document.createElement('li');
        if (i === 0) {
          li.textContent = '先に進む';
          li.addEventListener('click', () => {
            hole();
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
      // enemy.style.background = 'bottom/contain url(../img/gaikotsu_character.png)';
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
    let text = 'この世のものとは思えない美しさの泉が水をたたえている';
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
          hole();
        });
      }
      choice.appendChild(li);
    }
  };

/*-----------------------------------------------------------------*/

  function tryFounten() {
    allReset();
    let text = "ほとりには”飲むな！”と書かれた看板が立てられている"
    typewriter(text,message);
    stopChoice(text);
    for (let i = 0; i < 3; i++) {
      const li = document.createElement('li');
      if (i === 0) {
        li.textContent = '部屋の入り口に戻る';
        li.addEventListener('click', () => {
          inFounten();
        });
      } else if(i === 1) {
        li.textContent = '泉の水を飲んでみる';
        li.addEventListener('click', () => {
          if(drink === 1) {
            windowReset(message);
            windowReset(system);
            let text = 'おいしすぎる！エネルギーが身体中に浸透していく！';
            let textSystem = 'HPが20回復した';
            typewriter(text,message,textSystem,system);
            stopChoice2(text,textSystem);
            currentHp += 30;
            drink ++
            nowHp();

          } else if(drink === 2) {
            windowReset(message);
            windowReset(system);
            let text = 'おいしすぎておかしくなりそうだ！全身に力がみなぎってくる！';
            let textSystem = 'HPが50回復した';
            typewriter(text,message,textSystem,system);
            stopChoice2(text,textSystem);
            currentHp += 50;
            drink ++
            nowHp();

          } else if(drink === 3) {
            windowReset(message);
            windowReset(system);
            let text = 'すばらしい！！全身が泉の水になったようだ！';
            let textSystem = 'HPが500回復した';
            typewriter(text,message,textSystem,system);
            stopChoice2(text,textSystem);
            currentHp += 500;
            drink ++;
            nowHp();
            windowReset(choice);
            setTimeout(() => {
              li.textContent = '泉に飛び込む！';
              choice.appendChild(li);
            }, 50 * (text.length + textSystem.length));
          } else if(drink === 4){
            allReset();
            status.classList.add('hidden');
            text = `${yourName}は水とひとつになった。泉の仲間たちはあなたを快く受け入れ、溶け合い、新たな仲間が来るのを静かに待ち続けている`;
            let textSystem = 'G A M E O V E R';
            typewriter(text,message,textSystem,system);
          } else if(drink === 0) {
            windowReset(message);
            windowReset(system);
            let text = 'おいしい！エネルギーが身体中に浸透していくようだ！';
            let textSystem = 'HPが10回復した';
            typewriter(text,message,textSystem,system);
            stopChoice2(text,textSystem);
            currentHp += 10;
            drink ++
            nowHp();
          }
        });
      } else {
          li.textContent = '飛び込んでみる';
          console.log('飛び込んでみる');
          li.addEventListener('click', () => {
            const li = document.createElement('li');
            if(goldenRing === true) {
              allReset()
              let text = 'もうここに飛び込むのはごめんだ！';
              let textSystem = '1234567890';
              stopChoice(text,textSystem);
              typewriter(text);
              setTimeout(() => {
                tryFounten();
              }, 50 * (text.length + textSystem.length));
            } else {
              windowReset(message);
              let text = '水は冷たすぎず、不気味なくらい肌に馴染んでいる。ふと、あなたは水底に光るものを見つけた';
              typewriter(text);
              stopChoice(text);
              windowReset(choice);
              for(let i = 0; i < 2; i++){
                const li = document.createElement('li');
                if(i === 0){
                  li.textContent = '潜って探す【 HP -10 】';
                  li.addEventListener('click', () => {
                    const runNumber = Math.floor(Math.random() * 2);
                    if(runNumber === 0) {
                      currentHp -= 10;
                      text = '……だんだん水と自分との境界がわからなくなってきた…';
                      let textSystem = 'HPを10失った'
                      nowHp();
                      typewriter(text,message,textSystem,system);
                      stopChoice2(text,textSystem);
                      windowReset(message);
                      windowReset(system);
                      if(currentHp <= 0){
                        allReset();
                        setTimeout(() => {
                          allReset();
                          estatus.classList.add('hidden');
                          status.classList.add('hidden');
                          text = `${yourName}は溺れ死んだ。その死体はいつの間にか跡形もなく分解され、泉の水は少しだけ水位が増したとか増してないとか……`;
                          let textSystem = 'G A M E O V E R';
                          typewriter(text,message,textSystem,system);
                        }, 50 * (text.length + textSystem.length) + 1000);
                      }
                    } else {
                      currentHp -= 10;
                      text = '……見つけた！';
                      let textSystem = 'HPを10失った'
                      nowHp();
                      typewriter(text,message,textSystem,system);
                      stopChoice2(text,textSystem);
                      allReset();
                      if(currentHp <= 0){
                        setTimeout(() => {
                          allReset();
                          estatus.classList.add('hidden');
                          status.classList.add('hidden');
                          text = `${yourName}は溺れ死んだ。掴み取ったはずの何かは再び水底に沈んでいった……`;
                          let textSystem = 'G A M E O V E R';
                          typewriter(text,message,textSystem,system);
                        }, 50 * (text.length + textSystem.length) + 1000);
                      }　else {
                        const li = document.createElement('li');
                        li.textContent = '掴んで浮上する'
                        li.addEventListener('click', () => {
                          text = 'なんとか浮上できた！空気が体を満たす'
                          let textSystem = 'HPが40回復した'
                          currentHp += 40;
                          nowHp();
                          typewriter(text,message,textSystem,system);
                          stopChoice2(text,textSystem);
                          allReset();
                          const li = document.createElement('li');
                          li.textContent = '見つけたものを確認する'
                          li.addEventListener('click', () => {
                            allReset();
                            text = '見つけたのは金色の指輪だった'
                            let textSystem = '金の指輪を手に入れた'
                            typewriter(text,message,textSystem,system);
                            stopChoice2(text,textSystem);
                            goldenRing = true;
                            setTimeout(() => {
                              console.log(text.length + textSystem.length);
                              tryFounten();
                            }, 50 * (text.length + textSystem.length) + 1000);
                          });
                          choice.appendChild(li);
                        });
                        choice.appendChild(li);
                      }
                    }

                  });
                } else {
                  li.textContent = '引き返す';
                  li.addEventListener('click', () => {
                    allReset();
                    text = 'なんとか浮上できた……空気が全身にいきわたる'
                    let textSystem = 'HPが40回復した'
                    currentHp += 40;
                    nowHp();
                    typewriter(text,message,textSystem,system);
                    stopChoice2(text,textSystem);
                    setTimeout(() => {
                      console.log(text.length + textSystem.length);
                      tryFounten();
                    }, 50 * (text.length + textSystem.length) + 1000);
                  });
                }
                choice.appendChild(li);
              };
            }
          });
      }
      choice.appendChild(li);
    }
  };

/*-----------------------------------------------------------------*/

  startadv();
  // encount();
  // inFounten();
  // hole();
}
