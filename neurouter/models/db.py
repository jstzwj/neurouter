import os
from playhouse.db_url import connect

db_url = os.getenv('DATABASE_URL', 'sqlite:///app.db')

# 检查数据库类型
if not db_url.startswith(('sqlite://', 'mysql://', 'postgresql://')):
    raise ValueError(f"不支持的数据库类型: {db_url}")

db = connect(db_url)

# 数据库 URL 示例：
# Sqlite: sqlite:///app.db
# MySQL: mysql://user:password@host:3306/dbname
# PostgreSQL: postgresql://user:password@host:5432/dbname 