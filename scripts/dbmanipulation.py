import psycopg2
import matplotlib.pyplot as plt

con = psycopg2.connect(host='/var/run/postgresql', database='dis-backup-sales_records',
                       user='rodrigo', password='f0da-se123')
cur = con.cursor()

cur.execute(
    "select timestamp, total_sells from sales_records where product_id='8d0a4063-ab63-4a4b-ba14-28b74daf2032'")
recset = cur.fetchall()

print(len(recset))

ts = list(map(lambda i: i[0], recset))
sales = list(map(lambda i: i[1], recset))

plt.plot(ts, sales)
plt.show()

con.close()
