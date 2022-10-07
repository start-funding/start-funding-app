# ⚒ Installation

1. Install or upgrade to the latest stable version of node and npm from [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Verify the correct installation of Node by running the following commands:

    ```bash

    node -v

    ```

    or

    ```bash

    npm -v

    ```

3. Clone repository:

    ```bash

    git clone https://github.com/start-funding/start-funding-app.git

    ```
4. Move inside the directory:
	```bash

    cd start-funding-app/

    ```
5. Setup Cloud Firestore:
	- You need first to create a **Firestore database**: [Create a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart#create).
	- Generate your **key**: [How to setup a Firebase service account](https://sharma-vikashkr.medium.com/firebase-how-to-setup-a-firebase-service-account-836a70bb6646).
	- Move your JSON file to `backend/conf/` and rename it as `creds.json`, the complete path will be: `start-funding-app/backend/conf/creds.json`.
	- Back to your Firestore Database.
	- Create the following collections:
		- Collection ID: "**campaigns**"*;
		- Collection ID: "**stats**":
			- Add a document with the following parameters:
				1. Document ID: **"homestats"**;
				2. Field name: **"foundsCollected"**, Type: **"number"**, Value: **0**;
				3. Field name: **"successfulCampaigns"**, Type: **"number"**, Value: **0**;
				4. Field name: **"totalCampaigns"**, Type: **"number"**, Value: **0**.
6. Install [AlgoSigner extension](https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm) using [Google Chrome](https://www.google.com/intl/it_it/chrome/).

7. Setup a **Testnet AlgoSigner account**: [Getting Started with AlgoSigner](https://www.youtube.com/watch?v=tG-xzG8r770).

9. Fund it using [Algorand Testnet Dispenser](https://testnet.algoexplorer.io/dispenser).

10. Install required dependencies and launch servers:
    ```bash
    cd ..
    cd backend/
    npm install
    npm start
    ```
    
      and

    ```bash
    cd ..
    cd smartContractService/
    npm install
    npm run dev # wait until the compilation is done
    ctrl + c # quit compiler 
    npm start
    ```
      and
    ```bash
    cd frontend/
    npm install
    npm run start3001
    ```
