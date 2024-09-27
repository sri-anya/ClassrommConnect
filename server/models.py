from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.ext.associationproxy import association_proxy
from config import db
from datetime import datetime

from config import db, bcrypt

# Models go here!
class Class(db.Model, SerializerMixin):
    __tablename__ = 'classes'

    serialize_rules = (
        '-activity.classes_with_activities',
        '-class_students',
        '-class_teachers',
        '-students.classes',
        '-teachers.classes'
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    schedule = db.Column(db.String, nullable=False)
    room_number = db.Column(db.String, nullable=False)
    activity_id = db.Column(db.Integer(), db.ForeignKey('activities.id'))

     # Relationships: activity belongs to a class
    activity = db.relationship('Activity', back_populates="classes_with_activities")

    #Relationships: Many-to-many with Student 
    class_students = db.relationship(
        'Class_Student', back_populates='class_details', cascade='all, delete-orphan')
    students = association_proxy('class_students', 'student',
                                 creator=lambda student_obj: Class_Student(student=student_obj))
    
    #Relationships: Many-to-many with Teacher
    class_teachers = db.relationship(
        'Class_Teacher', back_populates='class_details_for_teachers', cascade='all, delete-orphan')
    teachers = association_proxy('class_teachers', 'teacher',
                                 creator=lambda teacher_obj: Class_Teacher(teacher=teacher_obj))
    
class Student(db.Model, SerializerMixin):
    __tablename__ = 'students'

    serialize_rules = (
        '-class_students.student',
        '-class_students.class_details.class_teachers.teacher',  # Avoid nesting teachers in classes
        '-class_students.class_details.activity.classes_with_activities',  # Avoid nesting activities in classes
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    
    #Relationships: Many-to-many with Class
    class_students = db.relationship(
        'Class_Student', back_populates='student', cascade='all, delete-orphan')
    classes = association_proxy('class_students', 'class_details',
                                 creator=lambda class_details_obj: Class_Student(class_details=class_details_obj))
    
class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    serialize_rules = (
        '-class_teachers.teacher',
        '-class_teachers.class_details_for_teachers.students.class_students.student',  # Avoid nesting students in classes
        '-class_teachers.class_details_for_teachers.activity.classes_with_activities',  # Avoid nesting activities in classes
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    #Relationships: Many-to-many with Class
    class_teachers = db.relationship(
        'Class_Teacher', back_populates='teacher', cascade='all, delete-orphan')
    classes = association_proxy('class_teachers', 'class_details_for_teachers',
                                 creator=lambda class_details_for_teachers_obj: Class_Teacher(class_details_for_teachers=class_details_for_teachers_obj))

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    serialize_rules = (
        '-classes_with_activities.activity',
        '-classes_with_activities.class_students.student',  # Avoid nesting students
        '-classes_with_activities.class_teachers.teacher',  # Avoid nesting teachers
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)

    #Relationships: One-to-many with Class
    classes_with_activities = db.relationship('Class', back_populates='activity', cascade='all, delete-orphan') 
    
class Class_Student(db.Model, SerializerMixin):
    __tablename__ = 'class_students'
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key to store the class id
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    # Foreign key to store the student id
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))

    # Relationship mapping the class_students to related class_details
    class_details = db.relationship('Class', back_populates='class_students')
    # Relationship mapping the class_students to related student
    student = db.relationship('Student', back_populates='class_students')

class Class_Teacher(db.Model, SerializerMixin):
    __tablename__ = 'class_teachers'
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key to store the class id
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    # Foreign key to store the teacher id
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'))

    # Relationship mapping the class_teachers to related class_details_for_teachers
    class_details_for_teachers = db.relationship('Class', back_populates='class_teachers')
    # Relationship mapping the class_teachers to related teacher
    teacher = db.relationship('Teacher', back_populates='class_teachers')