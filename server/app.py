#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api
# Add your model imports
from models import Student, Teacher, Class, Activity, Class_Student, Class_Teacher

# class StudentByID(Resource):

#     def get(self, id):
#         student = Student.query.filter_by(id=id).first()
#         if student:
#             return make_response(jsonify(student.to_dict()), 200)
#         else:
#             return make_response({"message":"record not found"},404)

#     def patch(self, id):
#         data = request.get_json()
#         student = Student.query.filter_by(id=id).first()

#         if student:
#             # Update student attributes
#             for attr in ['name', 'age']:
#                 if attr in data:
#                     setattr(student, attr, data[attr])

#             # Handle class updates
#             if 'class_students' in data:
#                 # Clear existing class relationships
#                 student.class_students.clear()
                
#                 # Add new classes
#                 for class_data in data['class_students']:
#                     # Assuming class_data contains the id of the class
#                     class_details = Class.query.filter_by(id=class_data['id']).first()
#                     if class_details:
#                         student.class_students.append(Class_Student(student=student, class_details=class_details))
            
#             db.session.commit()
#             return make_response(student.to_dict(), 200)
#         else:
#             return make_response({"message": "record not found"}, 404)

#     def delete(self, id):
#         student = Student.query.filter_by(id=id).first()
#         if student:
#             db.session.delete(student)
#             db.session.commit()

#             return make_response('', 204)
#         else:
#             return make_response({"message":"record not found"},404)
        

# class StudentByID(Resource):
    
#     def get(self, id):
#         student = Student.query.filter_by(id=id).first()
#         if student:
#             return make_response(jsonify(student.to_dict()), 200)
#         else:
#             return make_response({"message": "record not found"}, 404)

#     def patch(self, id):
#         data = request.get_json()
#         student = Student.query.filter_by(id=id).first()

#         if student:
#             # Update student attributes
#             for attr in ['name', 'age']:
#                 if attr in data:
#                     setattr(student, attr, data[attr])

#             # Handle class updates
#             if 'class_students' in data:
#                 # Clear existing class relationships
#                 student.class_students.clear()
                
#                 # Add new classes
#                 for class_data in data['class_students']:
#                     class_details = Class.query.filter_by(id=class_data['class_details']['id']).first()
#                     if class_details:
#                         student.class_students.append(Class_Student(student=student, class_details=class_details))
            
#             db.session.commit()
#             return make_response(student.to_dict(), 200)
#         else:
#             return make_response({"message": "record not found"}, 404)

#     def delete(self, id):
#         student = Student.query.filter_by(id=id).first()
#         if student:
#             db.session.delete(student)
#             db.session.commit()
#             return make_response('', 204)
#         else:
#             return make_response({"message": "record not found"}, 404)

class StudentByID(Resource):
    
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            return make_response(jsonify(student.to_dict()), 200)
        else:
            return make_response({"message": "record not found"}, 404)

    def patch(self, id):
        data = request.get_json()
        student = Student.query.filter_by(id=id).first()

        if student:
            # Update student attributes
            for attr in ['name', 'age']:
                if attr in data:
                    setattr(student, attr, data[attr])

            # Handle class updates
            if 'class_students' in data:
                # Clear existing class relationships
                student.class_students.clear()
                
                # Add new classes with a maximum limit of 5
                class_ids = [class_data['class_details']['id'] for class_data in data['class_students']]
                
                if len(class_ids) > 5:
                    return make_response({"message": "Cannot enroll in more than 5 classes."}, 400)

                for class_id in class_ids:
                    class_details = Class.query.filter_by(id=class_id).first()
                    if class_details:
                        student.class_students.append(Class_Student(student=student, class_details=class_details))
            
            db.session.commit()
            return make_response(student.to_dict(), 200)
        else:
            return make_response({"message": "record not found"}, 404)

    def delete(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            db.session.delete(student)
            db.session.commit()
            return make_response('', 204)
        else:
            return make_response({"message": "record not found"}, 404)


class Students(Resource):

    def get(self):
        students = [student.to_dict() for student in Student.query.all()]
        return make_response(jsonify(students), 200)
    
    def post(self):
        data = request.get_json()

        new_student = Student(
            name=data['name'],
            age=data['age']
        )
        db.session.add(new_student)
        db.session.commit()
        
        # Create relationships with selected classes
        cs = []
        for class_id in data['classes']:
            class_details = Class.query.get(class_id)  # Fetch class details by ID
            if class_details:
                cs.append(Class_Student(student=new_student, class_details=class_details))

        db.session.add_all(cs)
        db.session.commit()

        return make_response(new_student.to_dict(), 201)

    
class TeachersClasses(Resource):

    def get(self, id):
        teacher = Teacher.query.filter_by(id=id).first()
        teachersClasses = [classes.to_dict() for classes in teacher.classes]
        return make_response(jsonify(teachersClasses), 200)
    
class Classes(Resource):

    def get(self):
        classes = [class_item.to_dict() for class_item in Class.query.all()]
        return make_response(jsonify(classes), 200)
    
    def post(self):
        data = request.get_json()

        new_class = Student(
            name=data['name'],
            schedule=data['schedule'],
            room_number=data['room_number'],
            activity_id=data['activity_id']
        )

        db.session.add(new_class)
        db.session.commit()

        return make_response(new_class.to_dict(), 201)
    
class ClassByID(Resource):

    def get(self, id):
        class_item = Class.query.filter_by(id=id).first()
        if class_item:
            return make_response(jsonify(class_item.to_dict()), 200)
        else:
            return make_response({"message":"record not found"},404)

    def patch(self, id):
        data = request.get_json()

        class_item = Class.query.filter_by(id=id).first()
        if class_item:
            for attr in data:
                setattr(class_item, attr, data[attr])

            db.session.add(class_item)
            db.session.commit()

            return make_response(class_item.to_dict(), 200)
        else:
            return make_response({"message":"record not found"},404)

    def delete(self, id):
        class_item = Class.query.filter_by(id=id).first()
        if class_item:
            db.session.delete(class_item)
            db.session.commit()

            return make_response('', 204)
        else:
            return make_response({"message":"record not found"},404)
        
class Login(Resource):
    def post(self):

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        teacher = Teacher.query.filter(Teacher.username == username).first()

        if teacher and teacher.authenticate(password):

            session['teacher_id'] = teacher.id
            return teacher.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class CheckSession(Resource):

    def get(self):
        teacher_id = session.get('teacher_id')
        if teacher_id:
            teacher = Teacher.query.filter(Teacher.id == teacher_id).first()
            if teacher:
                return teacher.to_dict(), 200
        
        return {}, 401
    
class Logout(Resource):
    def delete(self):
        if session['teacher_id'] == None:
            return {}, 401
        
        session['teacher_id'] = None

        return {}, 204
                
api.add_resource(TeachersClasses, '/teachers/<int:id>/classes')
api.add_resource(Students, '/students')
api.add_resource(Classes, '/classes')
api.add_resource(StudentByID, '/students/<int:id>')
api.add_resource(ClassByID, '/classes/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')

@app.errorhandler(NotFound)
def handle_not_found(e):

    response = make_response(
        "Not Found: The requested resource does not exist.",
        404
    )

    return response

app.register_error_handler(404, handle_not_found)



if __name__ == '__main__':
    app.run(port=5555, debug=True)