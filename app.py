from flask import Flask, render_template, request
import os
import json
import openai

app = Flask("WritersUnblock")
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", ))
def index():
    return render_template("editor.html")


def cap_context(context):
    paragraph_list = context.split("\n")
    while sum([len(x) for x in paragraph_list]) > 4000:
        del paragraph_list[0]
    return "\n".join(paragraph_list)


@app.route("/api/askGptForText", methods=("POST", ))
def ask_gpt_for_text():
    data = json.loads(str(request.data, encoding="utf-8"))
    if 'context' not in data.keys():
        return {"Error": "There needs to be a context."}
    context = cap_context(data['context'].strip())
    print(context)
    response = openai.Completion.create(
        engine="text-davinci-001",
        prompt=context,
        temperature=0.5,
        max_tokens=250,
    )
    return {"newText": response.choices[0].text}
