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
];
