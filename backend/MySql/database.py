import mysql.connector
import os

# ✅ Database connection
db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "9867673236Aa@"),
    database=os.getenv("DB_NAME", "userdb")
)
cursor = db.cursor()

# ✅ Create users table (if not exists)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    )
""")

db.commit()
