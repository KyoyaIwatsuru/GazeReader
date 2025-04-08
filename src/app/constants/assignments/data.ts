export const assignments = [
  {
    text_id: 1,

    tasks: [
      {
        id: 1,
        question:
          "What is the primary suggestion made by Karen Pearson regarding worn-out shoes?",
        choices: [
          {
            id: 1,
            text: "They should be discarded to reduce household waste.",
          },
          {
            id: 2,
            text: "They can be donated, recycled, or repaired for a second life.",
          },
          {
            id: 3,
            text: "They are too damaged to be of any further use.",
          },
          {
            id: 4,
            text: "They should be kept at home as memorabilia.",
          },
        ],
        answer: 2,
        explanation: `この問題は、文章中でKaren Pearsonが古くなった靴についてどのような提案をしているかを問うものです。
        選択肢A: 「家庭のゴミを減らすために捨てるべきである」は、文章の内容と反対です。
        選択肢B: 「寄付、リサイクル、または修理して第二の人生を与えることができる」が正解です。Pearsonはこれらの方法で靴を再利用できると述べています。
        選択肢C: 「これ以上使い道がないほど損傷している」は、Pearsonの意見と異なります。
        選択肢D: 「記念品として家に保管すべきである」は、文章では触れられていません。`,
        keywords: [
          "worn-out shoes could have more value than you think - 古くなった靴には思ったより価値があるかもしれない",
          "donated, recycled or repaired - 寄付、リサイクル、または修理",
          "more than 300 million pairs of shoes end up in landfills each year - 毎年3億足以上の靴が埋め立て地に捨てられている",
        ],
      },
      {
        id: 2,
        question:
          "According to Catherine Meloy, what might surprise people about donating their old shoes to Goodwill?",
        choices: [
          {
            id: 1,
            text: "Goodwill only accepts shoes that are in perfect condition.",
          },
          {
            id: 2,
            text: "Old shoes have significant resale and reuse value.",
          },
          {
            id: 3,
            text: "Goodwill cannot accept single shoes or mismatched pairs.",
          },
          {
            id: 4,
            text: "Donated shoes are immediately recycled into new products.",
          },
        ],
        answer: 2,
        explanation: `この問題は、Catherine Meloyが古い靴の寄付について、人々が驚くかもしれないと述べていることは何かを問うものです。
        選択肢A: 「Goodwillは完璧な状態の靴しか受け取らない」は不正解です。実際、Goodwillはどんな状態の靴でも受け入れています。
        選択肢B: 「古い靴には大きな再販価値と再利用価値がある」が正解です。Meloyは人々がその価値に驚くかもしれないと述べています。
        選択肢C: 「Goodwillは片方だけの靴やペアが揃っていない靴を受け取ることができない」は不正解です。文章では、片方だけの靴も受け入れていると述べています。
        選択肢D: 「寄付された靴はすぐに新製品にリサイクルされる」は不正解です。文章では、靴が店で販売されたり、他の国で必要としている人々に提供されたりすると述べられています。`,
        keywords: [
          "accepts shoes in any condition, including single shoes - どんな状態の靴でも、片方だけの靴でも受け入れる",
          "You would be amazed at the resale and the reuse value of shoes - 靴の再販価値と再利用価値に驚くでしょう",
          "What may seem like a tattered shoe to you could be deemed sellable - あなたにはボロボロに見える靴でも、販売可能と見なされるかもしれない",
          "either in Goodwill stores or to other countries in need of shoes - Goodwillの店舗や、靴を必要としている他の国で",
        ],
      },
      {
        id: 3,
        question:
          "According to the passage, what is one reason why recycling old footwear can be challenging?",
        choices: [
          {
            id: 1,
            text: "The various materials and adhesives in shoes make them hard to dismantle for recycling.",
          },
          {
            id: 2,
            text: "There have been no improvements in recycling technology, making it nearly impossible to process old shoes.",
          },
          {
            id: 3,
            text: "Many take-back programs accept only certain brands, limiting the number of shoes that can be effectively recycled.",
          },
          {
            id: 4,
            text: "Even when shoes are collected for recycling, they often end up being exported instead, complicating the process.",
          },
        ],
        answer: 1,
        explanation: `この問題は、古い靴をリサイクルする際の困難さの理由について尋ねています。本文では、靴には布、ゴム、革、金属など多様な素材が使われており、これらが接着剤や縫製でしっかり組み合わされているため、分解し再利用することが難しいと述べられています。
        選択肢A: 「靴は様々な素材と接着剤で複雑に組み合わされており、分解が困難である」これは本文に明確に書かれているリサイクルの難点であり、正解です。
        選択肢B: 「リサイクル技術が全く進歩していない」本文ではリサイクル技術は向上しているものの、まだ課題があるとしています。よって不正解。
        選択肢C: 「特定のブランドしか受け付けないため、有効にリサイクルできる靴の数が限られる」ブランド限定のプログラムがあることは事実ですが、これは「リサイクルの難しさ」というよりも「プログラム利用範囲の制約」の問題であり、靴そのものを分解・リサイクルする技術的な難しさには直接言及していません。
        選択肢D: 「回収された靴がしばしば輸出されてしまい、その過程が複雑になる」確かに本文では輸出されるケースがあると述べられていますが、これも技術的なリサイクル上の困難というよりは、リサイクルが必ずしも実行されず、別の流通経路に回るという流れの問題です。`,
        keywords: [
          "brand-specific - 特定のブランドに限った",
          "Nike Grind - Nikeのプログラム名で古い靴を新しい製品や素材へと生まれ変わらせる",
          "breaking down and repurposing shoes is improving - 靴を分解して再利用する技術は改善している",
          "mix of materials, such as fabric, rubber, leather and metal - 生地、ゴム、革、金属など異なる素材が混在",
        ],
      },
    ],
  },
  {
    text_id: 2,

    tasks: [
      {
        id: 1,
        question:
          "What unprecedented combination of achievements did Shohei Ohtani record during the September 19 game against the Miami Marlins?",
        choices: [
          {
            id: 1,
            text: "He became the first major‑league player ever to record 50 home runs and 50 stolen bases in a single season.",
          },
          {
            id: 2,
            text: "He became the first major‑league player ever to hit three home runs and steal two bases in the same game.",
          },
          {
            id: 3,
            text: "He accomplished both of the feats described in A and B.",
          },
          {
            id: 4,
            text: "He threw a no‑hitter while hitting two home runs in the same game.",
          },
        ],
        answer: 3,
        explanation: `本文では、オオタニ選手が
        1. シーズン通算で「50本塁打・50盗塁」を初めて達成した選手となったこと、
        2. 同じ試合で「3本塁打・2盗塁」を初めて記録した選手となったこと、
        の両方が強調されています。そのため 両方を同時に成し遂げたことを示す選択肢Cが正解です。
        選択肢A: シーズン50‑50の快挙だけを述べており情報が不十分。
        選択肢B: 3本塁打2盗塁の試合記録だけを述べており情報が不十分。
        選択肢D: ノーヒットノーラン＋2本塁打という事実は本文に一切記載がなく誤り。`,
        keywords: [
          "boisterous crowd — 熱狂的な観客",
          "first major league player with at least 50 home runs and 50 stolen bases in a season — シーズン50‑50を初達成",
          "secured a playoff spot for the Dodgers — ドジャースのプレーオフ進出を確定させた",
        ],
      },
      {
        id: 2,
        question:
          "Which of the following statements about Shohei Ohtani’s historic game against the Miami Marlins is accurate?",
        choices: [
          {
            id: 1,
            text: "His 50th home run traveled 440 feet to right‑center off Marlins reliever George Soriano.",
          },
          {
            id: 2,
            text: "He stole his 50th and 51st bases in the first and second innings, extending his successful streak to 28 straight steals.",
          },
          {
            id: 3,
            text: "By finishing 5‑for‑5 with 9 RBIs, he joined Walker Cooper and Anthony Rendon as the only players with at least five hits, three homers and nine RBIs in a game.",
          },
          {
            id: 4,
            text: "He broke Shawn Green’s franchise record of 51 homers in a season that had stood since 2001.",
          },
        ],
        answer: 2,
        explanation: `本文には「オオタニは試合開始直後に50個目の盗塁を決め、続く回に51個目を決めた。直近28回連続で盗塁成功中である」と明記されています。数値（50, 51, 28）とイニング（1回・2回）の両方が本文と一致しています。
        選択肢A: 50本目の本塁打は右中間ではなく左方向（opposite‑field）に飛び、投手もMike Baumannです。さらに440フィートと記載されているのは51本目で、50本目の飛距離は示されていません。
        選択肢C: オオタニはこの試合で6‑for‑6、10 RBIsでした。5安打9打点という数字も、「少なくとも6安打・3本塁打・10打点」という史上3人目の偉業にも一致しません。
        選択肢D: 彼が破ったドジャースの球団記録は49本塁打（2001年のShawn Green）であり、51本ではありません。`,
        keywords: [
          "successful on his last 28 stolen base attempts — 直近28回連続盗塁成功",
          "broke the Dodgers’ franchise record of 49 homers set by Shawn Green in 2001 — 2001年にShawn Greenが樹立した49本の球団記録を更新",
          "third player in major league history with at least six hits, three homers and 10 RBIs in a game — 1試合6安打・3本塁打・10打点は史上3人目",
        ],
      },
      {
        id: 3,
        question:
          "Why did Shohei Ohtani fall one hit short of completing the cycle on September 19, according to the passage?",
        choices: [
          {
            id: 1,
            text: "He struck out in his final at‑bat, leaving him without a triple.",
          },
          {
            id: 2,
            text: "The Marlins intentionally walked him in the seventh inning, denying him a chance to hit a triple.",
          },
          {
            id: 3,
            text: "He was thrown out at third base while attempting to stretch his second double into a triple.",
          },
          {
            id: 4,
            text: "He was replaced by a pinch‑runner after his first double, so he never had the opportunity to reach third base.",
          },
        ],
        answer: 3,
        explanation: `本文では、オオタニは「サイクルヒットまであと三塁打1本足りなかった」と説明され、その理由として “He was thrown out at third base while trying to stretch his second double into a triple.” と明記されています。したがって選択肢Cが正解です。
        選択肢A: 三振したとは書かれていません。実際には6打数でヒットを量産しており、三振は問題になっていません。
        選択肢B: 7回表、マリンズは敬遠を選ばず勝負しています。敬遠で機会を奪われたわけではありません。
        選択肢D: 代走が送られた事実はなく、本人が走塁して三塁でアウトになったと記述されています。`,
        keywords: [
          "finished a triple shy of the cycle — サイクルヒットまで三塁打が足りなかった",
          "thrown out at third base while trying to stretch his second double into a triple — 2本目の二塁打を三塁打にしようとして三塁でアウト",
          "First base was open … decided against intentionally walking him — 敬遠せず勝負した",
        ],
      },
    ],
  },
];
