# burger-builder-tool

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class KasanaruBurgerBuilder : MonoBehaviour
{
    public GameObject meatPrefab;
    public GameObject tomatoPrefab;
    public GameObject cheesePrefab;
    public GameObject lettucePrefab;
    public GameObject topBunPrefab;
    public Transform burgerTrans;
    public GameObject bottomBun; // bottomBunの参照

    private float currentTopPos; // currentTopPosの初期化を削除

    public List<SetConfiguration> setConfigurations; // 各セットの構成を保持するリスト

    [System.Serializable]
    public class SetConfiguration
    {
        public bool includeMeat;
        public bool includeCheese;
        public bool includeTomato;
        public bool includeLettuce;
    }

    // スタート時にコルーチンを順番に開始
    IEnumerator StartCoroutinesInOrder()
    {
        // bottomBunの位置を基準に初期化
        Collider bottomBunCollider = bottomBun.GetComponent<Collider>();
        if (bottomBunCollider == null)
        {
            bottomBunCollider = bottomBun.AddComponent<BoxCollider>();
        }

        currentTopPos = bottomBun.transform.position.y + bottomBunCollider.bounds.size.y / 2;

        foreach (var setConfig in setConfigurations)
        {
            yield return StartCoroutine(AddSet(setConfig));
        }
        yield return StartCoroutine(AddTopBun());
    }

    void Start()
    {
        // bottomBunにコライダーを追加
        if (bottomBun.GetComponent<Collider>() == null)
        {
            bottomBun.AddComponent<BoxCollider>();
        }
        StartCoroutine(StartCoroutinesInOrder());
    }

    // セットを追加するコルーチン
    private IEnumerator AddSet(SetConfiguration setConfig)
    {
        if (setConfig.includeMeat)
            yield return StartCoroutine(AddLayer(meatPrefab, 1, 0.25f));
        if (setConfig.includeCheese)
            yield return StartCoroutine(AddLayer(cheesePrefab, 1, 0.05f));
        if (setConfig.includeTomato)
            yield return StartCoroutine(AddLayer(tomatoPrefab, 1, 0.05f));
        if (setConfig.includeLettuce)
            yield return StartCoroutine(AddLayer(lettucePrefab, 1, 0.05f));
    }

    // レイヤーを追加するコルーチン
    private IEnumerator AddLayer(GameObject prefab, int count, float heightIncrement)
    {
        for (int i = 0; i < count; i++)
        {
            GameObject obj = Instantiate(prefab, burgerTrans);
            obj.transform.position = new Vector3(0f, currentTopPos + heightIncrement / 2, 0f);
            AddColliders(obj); // コライダーを追加
            Rigidbody rb = obj.AddComponent<Rigidbody>(); // 物理演算を有効にする
            rb.mass = 0.1f; // 質量を設定する
            rb.collisionDetectionMode = CollisionDetectionMode.Continuous; // 衝突検出モードを設定
            currentTopPos += heightIncrement;
            yield return new WaitForSeconds(0.1f);
        }
    }

    // トップバンを追加するコルーチン
    private IEnumerator AddTopBun()
    {
        GameObject obj = Instantiate(topBunPrefab, burgerTrans);
        // ここでtopBunの初期位置をさらに上に設定
        obj.transform.position = new Vector3(0f, currentTopPos + 1.5f, 0f); // 1.5f上から上のパンを落とす
        AddColliders(obj); // コライダーを追加
        Rigidbody rb = obj.AddComponent<Rigidbody>(); // 物理演算を有効にする
        rb.mass = 0.1f; // 質量を設定する
        rb.collisionDetectionMode = CollisionDetectionMode.Continuous; // 衝突検出モードを設定
        yield return new WaitForSeconds(0.1f);
    }

    // オブジェクトにコライダーを追加するメソッド
    private void AddColliders(GameObject obj)
    {
        if (obj.GetComponent<Collider>() == null)
        {
            obj.AddComponent<BoxCollider>(); // コライダーを追加
        }
    }

    // Update is called once per frame
    void Update()
    {
        // 何か特定の更新処理があればここに書く
    }
}


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/burger-builder-tool.git
cd burger-builder-tool
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
