# MyToken DApp（ERC-20）

Solidity + Hardhat で作成した ERC-20 トークン（MyToken / MTK） と、
React + Ethers.js を使ったシンプルなフロントエンドで動作する Web3 DApp です。
MetaMask を接続して残高確認・送金ができる DApp の最小構成を実装しています。

## 開発進捗（Overview）

本プロジェクトは、ERC-20 トークンと React フロントエンドを組み合わせた
フルスタック Web3 学習用 DApp です。
現在は、基本機能（ウォレット接続・残高取得・送金）まで実装完了しています。
その他の機能は開発予定です。

## 実装済みの機能

### 1. スマートコントラクト（Solidity / Hardhat）

- オリジナル ERC-20 トークン MyToken (MTK) を作成
- Hardhat によるコンパイル・ローカルデプロイ
- Sepolia テストネットへのデプロイ済み
- OpenZeppelin ライブラリを使用

### 2. フロントエンド（React + Ethers.js）

- MetaMask との接続
- 現在のウォレットアドレスの表示
- MyToken 残高の取得
- MyToken の送金（transfer）
- React + TailwindCSS によるシンプルな UI

## UI
![alt text](screenshots/image.png)

## 今後の開発予定

- トランザクションステータス（送信中 / 成功 / 失敗）
- エラー処理の強化
- approve / transferFrom の UI
- トランザクション履歴ビュー
- 残高のリアルタイム更新（イベント購読）
- テストコード（Hardhat）
- 複数アカウント間での総合テスト

## 使用技術

### Smart Contract

- Solidity
- Hardhat
- OpenZeppelin

### Frontend

- React
- Vite
- TailwindCSS
- Ethers.js
- MetaMask

## 実行方法

1. スマートコントラクトのセットアップ
```
npm install
npx hardhat run scripts/deploy.js --network sepolia
```

2. フロントエンドの起動
```
cd frontend
npm install
npm run dev
```

## このプロジェクトで学べる内容

- スマートコントラクト ↔ フロントエンドの連携
- MetaMask と接続して操作する Web3 UI の実装
- Ethers.js を使ったトークン残高の取得・送金
- Hardhat を使ったデプロイ、テストネット運用