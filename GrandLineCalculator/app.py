"""
GrandLineAdventure - Flask Backend Engine
==========================================
Serves One Piece web application pages and REST API endpoints backed by SQLite database.
"""

import os
import json
import sqlite3
from flask import Flask, render_template, jsonify, request, send_from_directory

app = Flask(__name__, template_folder='pages', static_folder='.', static_url_path='')
DATABASE = 'database.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS islands (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                sea TEXT NOT NULL,
                saga TEXT,
                x INTEGER,
                y INTEGER,
                climate TEXT,
                danger INTEGER,
                lock_time_hours INTEGER,
                description TEXT,
                icon TEXT
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS characters (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                role TEXT,
                category TEXT NOT NULL,
                bounty INTEGER,
                fruit TEXT,
                haki TEXT,
                power_rating INTEGER,
                quote TEXT,
                image TEXT
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS devil_fruits (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                user TEXT,
                bounty_multiplier REAL,
                value_berries INTEGER,
                description TEXT
            )
        ''')

        conn.commit()

        # Seed characters from crew.json if database is empty or outdated
        cursor.execute("DELETE FROM characters")
        json_path = os.path.join(os.path.dirname(__file__), 'data', 'crew.json')
        if os.path.exists(json_path):
            with open(json_path, 'r', encoding='utf-8') as f:
                crew_data = json.load(f)
                for c in crew_data:
                    haki_str = ", ".join(c.get('haki', [])) if isinstance(c.get('haki'), list) else str(c.get('haki', ''))
                    cursor.execute(
                        "INSERT OR REPLACE INTO characters VALUES (?,?,?,?,?,?,?,?,?,?)",
                        (c['id'], c['name'], c['role'], c['category'], c['bounty'], c['fruit'], haki_str, c['powerRating'], c['quote'], c.get('image', ''))
                    )

        # Seed islands if empty
        cursor.execute("SELECT COUNT(*) FROM islands")
        if cursor.fetchone()[0] == 0:
            islands = [
                ("reverse_mountain", "Reverse Mountain", "Entrance", "East Blue / Entrance", 80, 480, "Stormy Canal", 4, 0, "Four ocean currents ascend to form the entry point into the Grand Line.", "🌊"),
                ("cactus_island", "Cactus Island (Whisky Peak)", "Paradise", "Arabasta Saga", 160, 420, "Arid / Desert", 3, 12, "Island surrounded by cactus rocks that are gravestones.", "🌵"),
                ("little_garden", "Little Garden", "Paradise", "Arabasta Saga", 230, 450, "Prehistoric Jungle", 5, 8760, "Primordial jungle with giant dinosaurs and dueling giants.", "🦖"),
                ("drum_island", "Drum Island (Sakura Kingdom)", "Paradise", "Arabasta Saga", 300, 380, "Winter / Sub-Zero", 4, 38, "Snow-covered medical kingdom. Birthplace of Chopper.", "❄️"),
                ("alabasta", "Alabasta Kingdom", "Paradise", "Arabasta Saga", 380, 440, "Summer Desert", 4, 120, "Vast desert realm governed by Nefertari family.", "🐪"),
                ("jaya", "Jaya Island", "Paradise", "Skypiea Saga", 450, 390, "Spring Tropical", 4, 96, "Lawless pirate haven of Mock Town.", "🏴‍☠️"),
                ("skypiea", "Skypiea (Sky Island)", "White-White Sea", "Skypiea Saga", 450, 200, "High Altitude / Sea Clouds", 5, 168, "Legendary island floating 10,000 meters in the sky.", "☁️"),
                ("water_7", "Water 7", "Paradise", "Water 7 Saga", 600, 400, "Maritime / Aqua Laguna", 3, 168, "Metropolis of shipwrights built on water.", "🏙️"),
                ("sabaody", "Sabaody Archipelago", "Paradise End", "Summit War Saga", 780, 420, "Mangrove / Bubble Climate", 5, 0, "Forest of Yarukiman Mangroves with resin bubbles.", "🫧"),
                ("fishman_island", "Fish-Man Island", "Undersea (10,000m)", "Fish-Man Island Saga", 780, 600, "Sub-oceanic Light", 4, 120, "Submerged paradise in a bubble 10,000m under sea.", "🧜‍♂️"),
                ("dressrosa", "Dressrosa Kingdom", "New World", "Dressrosa Saga", 940, 380, "Mediterranean / Passionate", 5, 96, "Country of love, passion, and toys.", "💃"),
                ("wano", "Wano Country", "New World", "Wano Country Saga", 1160, 330, "Seasonal Imperial", 5, 336, "Isolationist land of samurai atop waterfalls.", "🏯"),
                ("egghead", "Egghead Island", "New World", "Final Saga", 1240, 390, "Futuristic Dome", 5, 72, "Future Island with Dr. Vegapunk's laboratory.", "🤖"),
                ("laughtale", "Laugh Tale (Raftel)", "Final Horizon", "One Piece", 1340, 360, "Legendary / Hidden", 5, 0, "Final island containing Gol D. Roger's treasure.", "👑")
            ]
            cursor.executemany("INSERT INTO islands VALUES (?,?,?,?,?,?,?,?,?,?,?)", islands)

        conn.commit()

# --- Routes ---
@app.route('/')
def home():
    return send_from_directory('pages', 'index.html')

@app.route('/about')
@app.route('/about.html')
def about():
    return send_from_directory('pages', 'about.html')

@app.route('/characters')
@app.route('/characters.html')
def characters():
    return send_from_directory('pages', 'characters.html')

@app.route('/islands')
@app.route('/islands.html')
def islands():
    return send_from_directory('pages', 'islands.html')

@app.route('/bounty')
@app.route('/bounty.html')
def bounty():
    return send_from_directory('pages', 'bounty.html')

@app.route('/devil-fruits')
@app.route('/devil-fruits.html')
@app.route('/devil-fruit.html')
def devil_fruits():
    return send_from_directory('pages', 'devil-fruits.html')

# --- REST APIs ---
@app.route('/api/islands')
def api_islands():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM islands")
        return jsonify([dict(row) for row in cursor.fetchall()])

@app.route('/api/crew')
def api_crew():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM characters")
        return jsonify([dict(row) for row in cursor.fetchall()])

@app.route('/api/fruits')
def api_fruits():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM devil_fruits")
        return jsonify([dict(row) for row in cursor.fetchall()])

if __name__ == '__main__':
    init_db()
    print("[Grand Line Adventure] Server running on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
