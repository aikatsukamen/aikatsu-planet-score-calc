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
    {
      name: 'Magical Door ',
      notes: [
        {
          level: 1,
          op: 13,
          main: 6,
          climax: 15,
          finale: 7,
        },
        {
          level: 3,
          op: 21,
          main: 17,
          climax: 25,
          finale: 16,
        },
        {
          level: 5,
          op: 42,
          main: 22,
          climax: 44,
          finale: 39,
        },
      ],
    },
    {
      name: 'またまたまたまたまた明日',
      notes: [
        {
          level: 1,
          op: 15,
          main: 11,
          climax: 9,
          finale: 13,
        },
        {
          level: 5,
          op: 44,
          main: 35,
          climax: 37,
          finale: 47,
        },
      ],
    },
    {
      name: 'レディ・レディ・レディ',
      notes: [
        {
          level: 1,
          op: 10,
          main: 13,
          climax: 11,
          finale: 11,
        },
        {
          level: 5,
          op: 38,
          main: 54,
          climax: 41,
          finale: 35,
        },
      ],
    },
    {
      name: 'プチプラEveryday',
      notes: [
        {
          level: 1,
          op: 10,
          main: 8,
          climax: 21,
          finale: 14,
        },
        {
          level: 5,
          op: 39,
          main: 37,
          climax: 65,
          finale: 71,
        },
      ],
    },
    {
      name: 'Inner Voice',
      notes: [
        {
          level: 1,
          op: 6,
          main: 10,
          climax: 9,
          finale: 14,
        },
        {
          level: 5,
          op: 36,
          main: 47,
          climax: 32,
          finale: 57,
        },
      ],
    },
    {
      name: 'ファンタジっくイマジネーション',
      notes: [
        {
          level: 1,
          op: 8,
          main: 17,
          climax: 6,
          finale: 19,
        },
        {
          level: 3,
          op: 14,
          main: 43,
          climax: 14,
          finale: 46,
        },
        {
          level: 4,
          op: 21,
          main: 50,
          climax: 18,
          finale: 59,
        },
        {
          level: 5,
          op: 33,
          main: 75,
          climax: 30,
          finale: 83,
        },
      ],
    },
    {
      name: 'NeverNever',
      notes: [
        {
          level: 2,
          op: 19,
          main: 24,
          climax: 14,
          finale: 18,
        },
        {
          level: 5,
          op: 43,
          main: 82,
          climax: 38,
          finale: 56,
        },
      ],
    },
    {
      name: 'Shu-Bi-Du-Bi☆スイング',
      notes: [
        {
          level: 2,
          op: 19,
          main: 16,
          climax: 19,
          finale: 16,
        },
      ],
    },
    {
      name: 'Shu-Bi-Du-Bi☆スイング(仮)',
      notes: [
        {
          level: 5,
          op: 43,
          main: 54,
          climax: 51,
          finale: 49,
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
  const [typeLevel, setTypeLevel] = React.useState<[number, number, number]>([10, 10, 10]);
  const inputTypeLevel = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: string }>) => {
    const list: typeof typeLevel = [...typeLevel];
    const l = Number(event.target.value);
    list[index] = l ? l : 1;
    setTypeLevel(list);
  };
  // バトルごとのたまりやすい効果
  type Scoreup = 0 | 1 | 2 | 3;
  const [scoreUp, setScoreup] = React.useState<[Scoreup, Scoreup, Scoreup]>([0, 0, 0]);
  const changeScoreup = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: Scoreup }>) => {
    const list: typeof scoreUp = [...scoreUp];
    list[index] = event.target.value;
    setScoreup(list);
  };
  // ドレシアチャンスボーナス
  type ChanceBonus = 0 | 1 | 2 | 3 | 5;
  const [chanceBonus, setChanceBonus] = React.useState<[ChanceBonus, ChanceBonus, ChanceBonus]>([0, 0, 0]);
  const changeChanceBonus = (index: number) => (event: React.ChangeEvent<{ name?: string | undefined; value: Scoreup }>) => {
    const list: typeof chanceBonus = [...chanceBonus];
    list[index] = event.target.value;
    setChanceBonus(list);
  };

  // ノーツごとの計算結果
  type Battle = 'op' | 'main' | 'climax' | 'finale';
  const [notesScore, setNotesScore] = React.useState<
    {
      /** バトル種別 */
      battle: Battle;
      /** 判定 */
      judgeType: JUDGE;
      /** 判定による基礎点 */
      judge: number;
      /** ここまでのコンボ数 */
      combo: number;
      /** タイプレベルによるボーナス */
      typeLevelBonus: number;
      /** ドレシアレベルによるボーナス */
      // dressiaLevelBonus: number;
      /** コンボボーナス */
      comboBonus: number;
      /** 1ノーツ合計 */
      sum: number;
    }[]
  >([]);
  type ScoreSum = {
    /** 区間基礎点 */
    base: number;
    /** たまりやすい */
    scoreUp: number;
    /** チャンスボーナス */
    chance: number;
    /** 区間合計点 */
    sum: number;
    /** 判定総数 */
    judgeSum: {
      P: number;
      V: number;
      G: number;
      S: number;
      M: number;
    };
  };
  const [scoreSum, setScoreSum] = React.useState<ScoreSum[]>([]);

  // スコア再計算
  React.useEffect(() => {
    const list: typeof notesScore = [];
    /** 全ノーツ数 */
    const allNotes = musicInfo.op + musicInfo.main + musicInfo.climax + musicInfo.finale;
    const NAZO_BAIRITSU = 1.1466666666;
    const JUDGE_SCORE_BASE = {
      P: 700,
      V: 600,
      G: 500,
      S: 400,
      M: 0,
    };
    const JUDGE_SCORE_BASE_FINALE = {
      P: 112,
      V: 96,
      G: 80,
      S: 64,
      M: 0,
    };

    // 単ノーツの合計点を計算
    for (let i = 0; i < allNotes; i++) {
      /** 今のバトル */
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
      // 判定ごとの基礎スコアを計算
      /** タイプレベルボーナス。最大50 */
      const typeLevelBonus = battle !== 'finale' ? Math.floor(typeLevel[battleIndex] / 2) * 10 : 0;

      /** このノーツにおける判定 */
      const judge = judges[i];

      // コンボ
      let beforeCombo = 0;
      if (i !== 0) {
        const before = list[i - 1];
        beforeCombo = before.combo;
      }
      /** 現在のコンボ数 */
      const combo = judge !== 'M' && judge !== 'S' ? beforeCombo + 1 : 0;

      const kisotenList = {
        op: {
          P: 0,
          V: 0,
          G: 0,
          S: 0,
          M: 0,
        },
        main: {
          P: 0,
          V: 0,
          G: 0,
          S: 0,
          M: 0,
        },
        climax: {
          P: 0,
          V: 0,
          G: 0,
          S: 0,
          M: 0,
        },
      };

      // OPの基礎点リストを作る
      for (const judge of ['P', 'V', 'G', 'S', 'M']) {
        const opjudgeScore: number = JUDGE_SCORE_BASE[judge];
        /** ドレシアレベルボーナス */
        const dressiaLevelBonus = battle === 'finale' ? 0 : (opjudgeScore + typeLevelBonus) * 0.12 * (dressiaLevel[battleIndex] - 1);

        /** OPの基礎点(判定+タイプレベル+ドレシアレベル) */
        const opKisoten = judge === 'M' ? 0 : opjudgeScore + typeLevelBonus + dressiaLevelBonus;

        kisotenList['op'][judge] = opKisoten;
      }

      // Mainの基礎点リストを作る
      for (const judgeto of [['P', 'V'], ['V', 'G'], ['G', 'S'], 'M']) {
        const op = kisotenList['op'][judgeto[0]];
        kisotenList['main'][judgeto[1]] = op;
      }
      kisotenList['main']['P'] = Math.ceil(kisotenList['op']['P'] * NAZO_BAIRITSU * 10) / 10;

      // Climaxの基礎点リストを作る
      for (const judgeto of [['P', 'V'], ['V', 'G'], ['G', 'S'], 'M']) {
        const main = kisotenList['main'][judgeto[0]];
        kisotenList['climax'][judgeto[1]] = main;
      }
      kisotenList['climax']['P'] = Math.ceil(kisotenList['main']['P'] * 10 + (kisotenList['main']['P'] * 10 - kisotenList['op']['P'] * 10)) / 10;
      console.log(kisotenList);

      let comboSoten = combo < 3 ? 0 : Math.floor(100 * (1 + (dressiaLevel[battleIndex] - 1) * 0.12));
      if (battle === 'finale') comboSoten = combo < 3 ? 0 : 10; // フィナーレのコンボボーナスの基礎点は10点固定

      let comboMultiply = 1 + Math.floor((combo - 1) / 10);
      if (comboMultiply > 10) comboMultiply = 10; // 91コンボ以上の10倍で打ち止め
      console.log(`combo=${combo} comboSoten=${comboSoten}  comboMultiply=${comboMultiply}`);
      const comboBonus = comboSoten * comboMultiply;

      let baseScore: number = 0;
      switch (battle) {
        case 'op': {
          baseScore = kisotenList[battle][judge];
          break;
        }
        case 'main': {
          baseScore = kisotenList[battle][judge];
          break;
        }
        case 'climax': {
          baseScore = kisotenList[battle][judge];
          break;
        }
        case 'finale': {
          baseScore = JUDGE_SCORE_BASE_FINALE[judge];
          break;
        }
      }

      const oneNote: typeof list[0] = {
        battle: battle,
        judgeType: judge,
        judge: baseScore,
        combo: combo,
        typeLevelBonus: typeLevelBonus,
        comboBonus: comboBonus,
        sum: baseScore + comboBonus,
      };

      list.push(oneNote);
    }

    setNotesScore(list);

    // 各区間の基礎点を計算
    const op = Math.floor(
      list
        .filter((item) => item.battle === 'op')
        .map((item) => {
          return {
            ...item,
            sum: item.sum * 10,
          };
        })
        .reduce((prev, cur) => prev + cur.sum, 0) / 10,
    );
    const main = Math.floor(
      list
        .filter((item) => item.battle === 'main')
        .map((item) => {
          return {
            ...item,
            sum: item.sum * 10,
          };
        })
        .reduce((prev, cur) => prev + cur.sum, 0) / 10,
    );
    const climax = Math.floor(
      list
        .filter((item) => item.battle === 'climax')
        .map((item) => {
          return {
            ...item,
            sum: item.sum * 10,
          };
        })
        .reduce((prev, cur) => prev + cur.sum, 0) / 10,
    );
    const finale = Math.floor(list.filter((item) => item.battle === 'finale').reduce((prev, cur) => prev + cur.sum, 0));

    const result: ScoreSum[] = [];
    for (let i = 0; i < 3; i++) {
      let base = 0;
      let battle: Battle;
      switch (i) {
        case 0:
          base = op;
          battle = 'op';
          break;
        case 1:
          base = main;
          battle = 'main';
          break;
        case 2:
          base = climax;
          battle = 'climax';
          break;
        case 3:
          base = finale;
          battle = 'finale';
          break;
        default:
          battle = 'op';
      }
      const battleNotes = list.filter((item) => item.battle === battle);

      const res: ScoreSum = {
        base: base,
        scoreUp: 0,
        chance: 0,
        sum: 0,
        judgeSum: {
          P: battleNotes.filter((item) => item.judgeType === 'P').length,
          V: battleNotes.filter((item) => item.judgeType === 'V').length,
          G: battleNotes.filter((item) => item.judgeType === 'G').length,
          S: battleNotes.filter((item) => item.judgeType === 'S').length,
          M: battleNotes.filter((item) => item.judgeType === 'M').length,
        },
      };

      // たまりやすい
      res.scoreUp = Math.floor(res.base * (scoreUp[i] * 0.05));
      // チャンスボーナス
      res.chance = Math.floor(Math.floor(res.base + res.scoreUp) * (chanceBonus[i] * 0.1));
      // 区間合計点
      res.sum = res.base + res.scoreUp + res.chance;

      result.push(res);
    }
    setScoreSum(result);
  }, [judges.join(), dressiaLevel.join(), typeLevel.join(), scoreUp.join(), chanceBonus.join()]);

  return (
    <div className={classes.root}>
      <div className="SW-update-dialog"></div>

      {/* 曲・難易度選択 */}
      <div>楽曲・難易度選択</div>
      <Select style={{ width: 400 }} variant={'outlined'} value={musicSelect} onChange={chanageMusic}>
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
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={scoreUp[1]} onChange={changeScoreup(1)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={scoreUp[2]} onChange={changeScoreup(2)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
          </Select>
        </div>
        <div>
          <div>チャンスボーナス</div>
          <Select className={classes.input} variant={'outlined'} value={chanceBonus[0]} onChange={changeChanceBonus(0)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={5}>↑↑↑↑</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={chanceBonus[1]} onChange={changeChanceBonus(1)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={5}>↑↑↑↑</MenuItem>
          </Select>
          <Select className={classes.input} variant={'outlined'} value={chanceBonus[2]} onChange={changeChanceBonus(2)}>
            <MenuItem value={0}>なし</MenuItem>
            <MenuItem value={1}>↑</MenuItem>
            <MenuItem value={2}>↑↑</MenuItem>
            <MenuItem value={3}>↑↑↑</MenuItem>
            <MenuItem value={5}>↑↑↑↑</MenuItem>
          </Select>
        </div>
      </div>

      <Divider style={{ height: 20 }} />

      <div>ノーツ数： {musicInfo ? `O:${musicInfo.op} M:${musicInfo.main} C:${musicInfo.climax} F:${musicInfo.finale}` : ''}</div>

      <Divider style={{ height: 20 }} />

      <Table style={{ width: 600, textAlign: 'left' }}>
        <thead>
          <th style={{ width: 150 }}>バトル</th>
          <th style={{ width: 50 }}>P</th>
          <th style={{ width: 50 }}>V</th>
          <th style={{ width: 50 }}>G</th>
          <th style={{ width: 50 }}>S</th>
          <th style={{ width: 50 }}>M</th>
        </thead>
        <tbody>
          <tr>
            <td>オープニング</td>
            <td>{scoreSum[0]?.judgeSum.P ?? ''}</td>
            <td>{scoreSum[0]?.judgeSum.V ?? ''}</td>
            <td>{scoreSum[0]?.judgeSum.G ?? ''}</td>
            <td>{scoreSum[0]?.judgeSum.S ?? ''}</td>
            <td>{scoreSum[0]?.judgeSum.M ?? ''}</td>
          </tr>
          <tr>
            <td>メイン</td>
            <td>{scoreSum[1]?.judgeSum.P ?? ''}</td>
            <td>{scoreSum[1]?.judgeSum.V ?? ''}</td>
            <td>{scoreSum[1]?.judgeSum.G ?? ''}</td>
            <td>{scoreSum[1]?.judgeSum.S ?? ''}</td>
            <td>{scoreSum[1]?.judgeSum.M ?? ''}</td>
          </tr>
          <tr>
            <td>クライマックス</td>
            <td>{scoreSum[2]?.judgeSum.P ?? ''}</td>
            <td>{scoreSum[2]?.judgeSum.V ?? ''}</td>
            <td>{scoreSum[2]?.judgeSum.G ?? ''}</td>
            <td>{scoreSum[2]?.judgeSum.S ?? ''}</td>
            <td>{scoreSum[2]?.judgeSum.M ?? ''}</td>
          </tr>
          <tr>
            <td>フィナーレ</td>
            <td>{scoreSum[3]?.judgeSum.P ?? ''}</td>
            <td>{scoreSum[3]?.judgeSum.V ?? ''}</td>
            <td>{scoreSum[3]?.judgeSum.G ?? ''}</td>
            <td>{scoreSum[3]?.judgeSum.S ?? ''}</td>
            <td>{scoreSum[3]?.judgeSum.M ?? ''}</td>
          </tr>
        </tbody>
      </Table>

      <Divider style={{ height: 20 }} />

      {/* 区間合計 */}
      <Table style={{ width: 800, textAlign: 'left' }}>
        <thead>
          <th>バトル</th>
          <th>単ノーツ合計点</th>
          <th>たまりやすいボーナス</th>
          <th>チャンスボーナスアップ</th>
          <th>合計スコア</th>
        </thead>
        <tbody>
          <tr>
            <td>オープニング</td>
            <td>{scoreSum[0]?.base ?? ''}</td>
            <td>{scoreSum[0]?.scoreUp ?? ''}</td>
            <td>{scoreSum[0]?.chance ?? ''}</td>
            <td>{scoreSum[0]?.sum ?? ''}</td>
          </tr>
          <tr>
            <td>メイン</td>
            <td>{scoreSum[1]?.base ?? ''}</td>
            <td>{scoreSum[1]?.scoreUp ?? ''}</td>
            <td>{scoreSum[1]?.chance ?? ''}</td>
            <td>{scoreSum[1]?.sum ?? ''}</td>
          </tr>
          <tr>
            <td>クライマックス</td>
            <td>{scoreSum[2]?.base ?? ''}</td>
            <td>{scoreSum[2]?.scoreUp ?? ''}</td>
            <td>{scoreSum[2]?.chance ?? ''}</td>
            <td>{scoreSum[2]?.sum ?? ''}</td>
          </tr>
          <tr>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
          </tr>
          <tr>
            <td>O/M/C合計</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{scoreSum[0]?.sum + scoreSum[1]?.sum + scoreSum[2]?.sum ?? ''}</td>
          </tr>
          {/* <tr>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
          </tr> */}
          {/* <tr>
            <td>フィナーレ</td>
            <td>{scoreSum[3]?.sum ?? ''}</td>
          </tr> */}
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
            <th style={{ width: 120 }}>バトル・判定基礎点</th>
            <th style={{ width: 120 }}>コンボボーナス</th>
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
                  <div style={{ width: 120 }}>{notes.comboBonus}</div>
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
