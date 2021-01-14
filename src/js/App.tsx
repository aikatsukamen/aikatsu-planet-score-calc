import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 5,
    },
    input: {
      width: 120,
      marginRight: 10,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles({});

  const [musicList, setMusicList] = React.useState([
    {
      name: 'HAPPY∞アイカツ！',
      notes: [
        {
          level: 1,
          op: 9,
          main: 13,
          climax: 13,
          finale: 12,
        },
        {
          level: 5,
          op: 38,
          main: 54,
          climax: 63,
          finale: 64,
        },
      ],
    },
    {
      name: 'Bloomy＊スマイル',
      notes: [
        {
          level: 1,
          op: 7,
          main: 6,
          climax: 10,
          finale: 19,
        },
        {
          level: 5,
          op: 39,
          main: 29,
          climax: 38,
          finale: 97,
        },
      ],
    },
    {
      name: 'キラリ☆パーティ♪タイム',
      notes: [
        {
          level: 1,
          op: 10,
          main: 8,
          climax: 21,
          finale: 19,
        },
        {
          level: 5,
          op: 38,
          main: 24,
          climax: 66,
          finale: 60,
        },
      ],
    },
    {
      name: 'FLYING TIPS',
      notes: [
        {
          level: 1,
          op: 8,
          main: 14,
          climax: 15,
          finale: 16,
        },
        {
          level: 5,
          op: 30,
          main: 51,
          climax: 54,
          finale: 59,
        },
      ],
    },
  ]);

  const [musicSelect, setMusicSelect] = React.useState('-');
  const chanageMusic = (event: React.ChangeEvent<{ name?: string | undefined; value: string }>) => {
    setMusicSelect(event.target.value);

    const level = Number(event.target.value.slice(0, 1));
    const name = event.target.value.slice(2);
    const music = musicList.find((m) => m.name === name);
    if (!music) return;

    const notes = music.notes.find((n) => n.level === level);
    if (!notes) return;

    setMusicInfo({
      name: music.name,
      ...notes,
    });

    // 判定リストを初期化
    const allNotes = notes.op + notes.main + notes.climax + notes.finale;
    const judgeList: typeof judges = [];
    for (let i = 0; i < allNotes; i++) {
      judgeList.push('P');
    }
    setJudges(judgeList);
  };

  type JUDGE = 'P' | 'V' | 'G' | 'S' | 'M';

  const [musicInfo, setMusicInfo] = React.useState<{ name: string; op: number; main: number; climax: number; finale: number }>({
    name: '',
    op: 0,
    main: 0,
    climax: 0,
    finale: 0,
  });
  // ノーツごとの判定
  const [judges, setJudges] = React.useState<JUDGE[]>([]);
  const selectNoteJudge = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: JUDGE }>) => {
    const list: typeof judges = [...judges];
    list[index] = event.target.value;
    setJudges(list);
  };

  // バトルごとのドレシアレベル
  const [dressiaLevel, setDressiaLevel] = React.useState<[number, number, number]>([1, 1, 1]);
  const inputDressiaLevel = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: string }>) => {
    const list: typeof dressiaLevel = [...dressiaLevel];
    const l = Number(event.target.value);
    list[index] = l ? l : 1;
    setDressiaLevel(list);
  };
  // バトルごとのタイプレベル
  const [typeLevel, setTypeLevel] = React.useState<[number, number, number]>([1, 1, 1]);
  const inputTypeLevel = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: string }>) => {
    const list: typeof typeLevel = [...typeLevel];
    const l = Number(event.target.value);
    list[index] = l ? l : 1;
    setTypeLevel(list);
  };
  // バトルごとのたまりやすい効果
  type Scoreup = 0 | 3 | 6 | 9;
  const [scoreUp, setScoreup] = React.useState<[Scoreup, Scoreup, Scoreup]>([0, 0, 0]);
  const changeScoreup = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: Scoreup }>) => {
    const list: typeof scoreUp = [...scoreUp];
    list[index] = event.target.value;
    setScoreup(list);
  };

  // ノーツごとの計算結果
  type Battle = 'op' | 'main' | 'climax' | 'finale';
  const [notesScore, setNotesScore] = React.useState<
    {
      /** バトル種別 */
      battle: Battle;
      /** 判定による基礎点 */
      judge: number;
      /** ここまでのコンボ数 */
      combo: number;
      /** コンボボーナス */
      comboScore: number;
      /** タイプレベルによるボーナス */
      typeLevelBonus: number;
      /** ドレシアレベルによるボーナス */
      dressiaLevelBonus: number;
      /** たまりやすいによるボーナス */
      scoreupBonus: number;
      /** 1ノーツ合計 */
      sum: number;
    }[]
  >([]);
  const [scoreSum, setScoreSum] = React.useState<[number, number, number, number]>([0, 0, 0, 0]);

  // スコア再計算
  React.useEffect(() => {
    const list: typeof notesScore = [];
    const allNotes = musicInfo.op + musicInfo.main + musicInfo.climax + musicInfo.finale;

    for (let i = 0; i < allNotes; i++) {
      let battle: Battle = 'op';
      let battleIndex = 0;
      if (i < musicInfo.op) {
        battle = 'op';
        battleIndex = 0;
      } else if (i < musicInfo.op + musicInfo.main) {
        battle = 'main';
        battleIndex = 1;
      } else if (i < musicInfo.op + musicInfo.main + musicInfo.climax) {
        battle = 'climax';
        battleIndex = 2;
      } else {
        battle = 'finale';
        battleIndex = 3;
      }

      // 判定
      const judge = judges[i];
      const JUDGE_SCORE = {
        op: {
          P: 700,
          V: 600,
          G: 500,
          S: 400,
          M: 0,
        },
        main: {
          P: 800,
          V: 700,
          G: 600,
          S: 500,
          M: 0,
        },
        climax: {
          P: 900,
          V: 800,
          G: 700,
          S: 600,
          M: 0,
        },
        finale: {
          P: 112,
          V: 96,
          G: 80,
          S: 64,
          M: 0,
        },
      };
      const judgeScore = JUDGE_SCORE[battle][judge];

      let beforeCombo = 0;
      if (i !== 0) {
        const before = list[i - 1];
        beforeCombo = before.combo;
      }
      const combo = judge !== 'M' ? beforeCombo + 1 : 0;
      let comboScore = 0;
      if (battle !== 'finale') {
        if (combo > 2) {
          comboScore = (combo - 2) * 100;
        }
      } else {
        comboScore = 10;
      }
      const typeLevelBonus = battle !== 'finale' ? (typeLevel[battleIndex] - 1) * 10 : 0;
      const DRESSIA_LEVEL_BASE = {
        op: {
          P: 84,
          V: 72,
          G: 60,
          S: 48,
          M: 0,
        },
        main: {
          P: 96,
          V: 84,
          G: 72,
          S: 60,
          M: 0,
        },
        climax: {
          P: 108,
          V: 96,
          G: 84,
          S: 72,
          M: 0,
        },
      };
      const dressiaLevelBonus = battle !== 'finale' ? (dressiaLevel[battleIndex] - 1) * DRESSIA_LEVEL_BASE[battle][judge] : 0;

      // たまりやすいの基礎点
      // 判定基礎点 + ドレシアレベル
      const scoreUpBase = judgeScore + dressiaLevelBonus;
      let scoreupBonus = 0;
      switch (scoreUp[battleIndex]) {
        case 3:
          scoreupBonus = Math.floor(scoreUpBase / 100) * 20 - 10;
          break;
        case 6:
          scoreupBonus = Math.floor(scoreUpBase / 100) * 40 - 30;
          break;
        case 9:
          scoreupBonus = Math.floor(scoreUpBase / 100) * 60 - 50;
          break;
      }

      const oneNote: typeof list[0] = {
        battle: battle,
        judge: judgeScore,
        combo: combo,
        comboScore: comboScore,
        typeLevelBonus: typeLevelBonus,
        dressiaLevelBonus: dressiaLevelBonus,
        scoreupBonus: scoreupBonus,
        sum: judgeScore + comboScore + typeLevelBonus + dressiaLevelBonus + scoreupBonus,
      };

      list.push(oneNote);
    }

    setNotesScore(list);

    // 合計を計算
    const op = list.filter((item) => item.battle === 'op').reduce((prev, cur) => prev + cur.sum, 0);
    const main = list.filter((item) => item.battle === 'main').reduce((prev, cur) => prev + cur.sum, 0);
    const climax = list.filter((item) => item.battle === 'climax').reduce((prev, cur) => prev + cur.sum, 0);
    const finale = list.filter((item) => item.battle === 'finale').reduce((prev, cur) => prev + cur.sum, 0);
    setScoreSum([op, main, climax, finale]);
  }, [judges.join(), dressiaLevel.join(), typeLevel.join(), scoreUp.join()]);

  return (
    <div className={classes.root}>
      {/* 曲・難易度選択 */}
      <div>楽曲・難易度選択</div>
      <Select style={{ width: 300 }} variant={'outlined'} value={musicSelect} onChange={chanageMusic}>
        {musicList.map((music) => {
          return music.notes.map((n) => {
            return <MenuItem value={`${n.level},${music.name}`}>{`${music.name} ★${n.level}`}</MenuItem>;
          });
        })}
      </Select>
      {/* レベルとかの設定 */}
      <div>
        <div>
          <div>ドレシアレベル</div>
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 15 } }}
            className={classes.input}
            variant={'outlined'}
            value={dressiaLevel[0]}
            onChange={inputDressiaLevel(0)}
            label={'オープニング'}
          />
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 15 } }}
            className={classes.input}
            variant={'outlined'}
            value={dressiaLevel[1]}
            onChange={inputDressiaLevel(1)}
            label={'メイン'}
          />
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 15 } }}
            className={classes.input}
            variant={'outlined'}
            value={dressiaLevel[2]}
            onChange={inputDressiaLevel(2)}
            label={'クライマックス'}
          />
        </div>
        <div>
          <div>タイプレベル</div>
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            className={classes.input}
            variant={'outlined'}
            value={typeLevel[0]}
            onChange={inputTypeLevel(0)}
            label={'オープニング'}
          />
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            className={classes.input}
            variant={'outlined'}
            value={typeLevel[1]}
            onChange={inputTypeLevel(1)}
            label={'メイン'}
          />
          <TextField
            type={'number'}
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            className={classes.input}
            variant={'outlined'}
            value={typeLevel[2]}
            onChange={inputTypeLevel(2)}
            label={'クライマックス'}
          />
        </div>
        <div>
          <div>たまりやすい</div>
          <Select className={classes.input} variant={'outlined'} value={scoreUp[0]} onChange={changeScoreup(0)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={6}>↑↑↑ × 2</MenuItem>
            <MenuItem value={9}>↑↑↑ × 3</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={scoreUp[1]} onChange={changeScoreup(1)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={6}>↑↑↑ × 2</MenuItem>
            <MenuItem value={9}>↑↑↑ × 3</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={scoreUp[2]} onChange={changeScoreup(2)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={6}>↑↑↑ × 2</MenuItem>
            <MenuItem value={9}>↑↑↑ × 3</MenuItem>
          </Select>
        </div>
      </div>

      <Divider style={{ height: 20 }} />

      <div>ノーツ数： {musicInfo ? `O:${musicInfo.op} M:${musicInfo.main} C:${musicInfo.climax} F:${musicInfo.finale}` : ''}</div>

      <Divider style={{ height: 20 }} />

      {/* 区間合計 */}
      <Table style={{ width: 300 }}>
        <thead>
          <th>バトル</th>
          <th>合計スコア</th>
        </thead>
        <tbody>
          <tr>
            <td>オープニング</td>
            <td>{scoreSum[0]}</td>
          </tr>
          <tr>
            <td>メイン</td>
            <td>{scoreSum[1]}</td>
          </tr>
          <tr>
            <td>クライマックス</td>
            <td>{scoreSum[2]}</td>
          </tr>
          <tr>
            <td>フィナーレ</td>
            <td>{scoreSum[3]}</td>
          </tr>
        </tbody>
      </Table>

      <Divider style={{ height: 20 }} />

      {/* ノーツごとの判定選択・1ノーツ計算結果 */}
      <div>
        <div>
          <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, border: '1px solid' }}>
            <th style={{ width: 120 }}>ノーツ番号</th>
            <th style={{ width: 50 }}>バトル</th>
            <th style={{ width: 160 }}>判定</th>
            <th style={{ width: 120 }}>現在のコンボ数</th>
            <th style={{ width: 120 }}>判定基礎点</th>
            <th style={{ width: 120 }}>コンボボーナス</th>
            <th style={{ width: 110 }}>タイプレベルボーナス</th>
            <th style={{ width: 120 }}>ドレシアレベルボーナス</th>
            <th style={{ width: 110 }}>
              <Tooltip title="ボーナスの基礎点は 判定基礎点+ドレシアレベルボーナス で計算">
                <div>たまりやすいボーナス</div>
              </Tooltip>
            </th>
            <th style={{ width: 120, borderLeft: '1px solid' }}>1ノーツ合計点</th>
          </div>
          <div>
            {notesScore.map((notes, index) => {
              return (
                <div style={{ display: 'flex', border: '1px solid grey' }}>
                  <div style={{ width: 120 }}>{index + 1}</div>
                  <div style={{ width: 50 }}>{notes.battle}</div>
                  <div style={{ width: 160 }}>
                    <Select style={{ width: 150 }} variant={'outlined'} value={judges[index]} onChange={selectNoteJudge(index)}>
                      <MenuItem value="P">パーフェクト</MenuItem>
                      <MenuItem value="V">ベリーグッド</MenuItem>
                      <MenuItem value="G">グッド</MenuItem>
                      <MenuItem value="S">セーフ</MenuItem>
                      <MenuItem value="M">ミス</MenuItem>
                    </Select>
                  </div>
                  <div style={{ width: 120 }}>{notes.combo}</div>
                  <div style={{ width: 120 }}>{notes.judge}</div>
                  <div style={{ width: 120 }}>{notes.comboScore}</div>
                  <div style={{ width: 110 }}>{notes.typeLevelBonus}</div>
                  <div style={{ width: 120 }}>{notes.dressiaLevelBonus}</div>
                  <div style={{ width: 110 }}>{notes.scoreupBonus}</div>
                  <div style={{ width: 120, borderLeft: '1px solid' }}>{notes.sum}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 合計 */}
      <div></div>
    </div>
  );
};

export default App;
