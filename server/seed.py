from models import db, Class, Student, Teacher, Activity, Class_Student, Class_Teacher
from app import app
from faker import Faker
import random
from datetime import datetime, timedelta

# Days of the week
DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']


# Clear existing data
def clear_data():
    db.session.query(Class_Student).delete()
    db.session.query(Class_Teacher).delete()
    db.session.query(Class).delete()
    db.session.query(Student).delete()
    db.session.query(Teacher).delete()
    db.session.query(Activity).delete()
    db.session.commit()

# Seed the database
if __name__ == "__main__":
    with app.app_context():

        clear_data()
        fake = Faker()
        
        # Create some teachers
        teachers = []
        for _ in range(5):
            teacher = Teacher(
                name=fake.profile(fields=['name'])['name'],
                username=fake.profile(fields=['username'])['username']
            )
            teacher.password_hash = "Teacher"
            teachers.append(teacher)
        db.session.add_all(teachers)
        db.session.commit()
        


        # Create some activities
        activities = []
        for _ in range(3):
            activity = Activity(
                name=random.choice(["Scavenger hunt","Climb a tree","Teddy bears' picnic","Getting hands dirty","Dressing up","Hopscotch","Chill out den"]).capitalize() + " Day",
                description="we will be having "+random.choice(["Scavenger hunt","Climb a tree","Teddy bears' picnic","Getting hands dirty","Dressing up","Hopscotch","Chill out den"]).lower()+" day",
                date=fake.date_between(start_date='-1y', end_date='today')
            )
            activities.append(activity)
        db.session.add_all(activities)
        db.session.commit()

        # Create some classes
        classes = []
        for _ in range(8):
            class_ = Class(
                name=random.choice(["German", "English", "Latin", "Spanish", "Math", "Science","Music", "Drama", "New", "Computer Science", "Magic", "Art"]).capitalize() + " Class",
                schedule=f"{random.choice(DAYS_OF_WEEK)} ",
                room_number=str(random.randint(101, 120)),
                number_of_students = 10,
                activity_id=random.choice(activities).id  # Assign random activity
            )
            classes.append(class_)
        db.session.add_all(classes)
        db.session.commit()

        # Create some students
        students = []
        for _ in range(10):
            student = Student(
                name=fake.name(),
                age=random.randint(3, 6),  # Typical preschool age
            )
            students.append(student)
        db.session.add_all(students)
        db.session.commit()

        # Assign students to classes
        for student in students:
            for _ in range(random.randint(1, 2)):  # Each student can belong to 1 or 2 classes
                class_ = random.choice(classes)
                class_student = Class_Student(class_id=class_.id, student_id=student.id)
                db.session.add(class_student)

        db.session.commit()

        # Assign teachers to classes
        for class_ in classes:
            for _ in range(random.randint(1, 2)):  # Each class can have 1 or 2 teachers
                teacher = random.choice(teachers)
                class_teacher = Class_Teacher(class_id=class_.id, teacher_id=teacher.id)
                db.session.add(class_teacher)

        db.session.commit()
        print("Database seeded!")


