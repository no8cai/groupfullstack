from app.models import db, Pledge, environment, SCHEMA

def seed_pledges():
    pledge1 = Pledge(rewardId=1, projectId=1, backerId=1)
    pledge2 = Pledge(rewardId=1, projectId=1, backerId=2)

    pledge3 = Pledge(rewardId=2, projectId=1, backerId=3)
    pledge4 = Pledge(rewardId=2, projectId=1, backerId=4)

    pledge5 = Pledge(rewardId=3, projectId=1, backerId=5)
    pledge6 = Pledge(rewardId=3, projectId=1, backerId=6)



    #      #reward id 2
    # for reward in range(54):
    #         # project id 6
    #        for project in range(18):
    #             # backer id 1
    #             for backerId in range(6):

    # for i in range(108):
    #     return (db.session.add(Pledge(rewardId=i, projectId=i, backerId=i)))


    db.session.add(pledge1)
    db.session.add(pledge2)
    db.session.add(pledge3)
    db.session.add(pledge4)
    db.session.add(pledge5)
    db.session.add(pledge6)


    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.

def undo_pledges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pledges")

    db.session.commit()
