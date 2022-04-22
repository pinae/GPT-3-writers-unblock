# GPT-3-writers-unblock
A small editor which prevents any writers block. If you do not type GPT-3 will do it for you.

## Installation

Clone the code:

```bash
git clone https://github.com/pinae/GPT-3-writers-unblock.git
cd GPT-3-writers-unblock
```

Create a virtualenv:

```bash
python3 -m venv env
source env/bin/activate
pip install -U pip
```

Windows users need to start the virtualenv with `.\env\Scripts\activate`.

Install the dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env`-File with your `OPENAI_API_KEY`. You may also use `export OPENAI_API_KEY=XXXXXXXXXXXX` but you need to execute that every time you start the software. A `.env`-File will keep the variable for every start.

## Running the software

If not already running activate your virtualenv (`source env/bin/activate`). After that run the software with:

```bash
flask run
```

The webapp will be available at [`http://localhost:5000`](http://localhost:5000).

Have fun!
