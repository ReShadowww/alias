from flask import Flask, render_template, url_for, request, jsonify
import json
import random

app = Flask(__name__)

with open("lt-alias-picked.json", "r", encoding="UTF-8") as fin:
    words = json.load(fin)
    total_words = len(words)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/_new_card")
def gen_card():
    random_index = random.randint(0, total_words - 1)
    random_word = words[random_index]["zodis"].capitalize()
    return jsonify(random_word)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
    # app.run(debug=True)
