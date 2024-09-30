#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource
from werkzeug.exceptions import NotFound

# Local imports
from config import app, db, api
# Add your model imports
from models import Student, Teacher, Class, Activity

class StudentByID(Resource):

    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            return make_response(jsonify(student.to_dict()), 200)
        else:
            return make_response({"message":"record not found"},404)

    def patch(self, id):
        data = request.get_json()

        student = Student.query.filter_by(id=id).first()
        if student:
            for attr in data:
                setattr(student, attr, data[attr])

            db.session.add(student)
            db.session.commit()

            return make_response(student.to_dict(), 200)
        else:
            return make_response({"message":"record not found"},404)

    def delete(self, id):
        student = Student.query.filter_by(id=id).first()
        if student:
            db.session.delete(student)
            db.session.commit()

            return make_response('', 204)
        else:
            return make_response({"message":"record not found"},404)
        
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

        return make_response(new_student.to_dict(), 201)
    
class Teachers(Resource):

    def get(self):
        teachers = [teacher.to_dict() for teacher in Teacher.query.all()]
        return make_response(jsonify(teachers), 200)
    
class Classes(Resource):

    def get(self):
        classes = [class_item.to_dict() for class_item in Class.query.all()]
        return make_response(jsonify(classes), 200)
    
    def post(self):
        data = request.get_json()

        new_class = Student(
            name=data['name'],
            schedule=data['schedule'],
            room_number=data['room_number']
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
        email = data.get('username')
        password = data.get('password')

        teacher = Teacher.query.filter(Teacher.email == email).first()

        if teacher and teacher.authenticate(password):

            session['teacher_id'] = teacher.id
            return teacher.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return user.to_dict(), 200
        
        return {}, 401
    
class Logout(Resource):
    def delete(self):
        if session['user_id'] == None:
            return {}, 401
        
        session['user_id'] = None

        return {}, 204
    
class Signup(Resource):
    def get(self):
        return {"message": "Signup get method"}, 200

    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')
        image_url = data.get('image_url')
        role = data.get('role')

        errors = []

        # # Validate input
        if not email:
            return ({'errors': 'email is required'}), 422
        if not password:
            return ({'errors': 'password is required'}), 422
       
        if password != password_confirmation:
            return {'errors':'Password and confirmation do not match.'}, 422
        if len(password) < 6:
            return {'errors':'Password must be at least 6 characters long.'}, 422
        # if User.query.filter_by(email=email).first():
        #     return {'Username already exists.'}, 422

        
        # Create new user
        new_user = User(name=name, email=email, image_url=image_url, role=role)
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()

            # Save user ID in session
            session['user_id'] = new_user.id

            # Return success response
            return new_user.to_dict(), 201
        except:
            return {"unauthorized action"}, 422
        
api.add_resource(Teachers, '/teachers')
api.add_resource(Students, '/students')
api.add_resource(Classes, '/classes')
api.add_resource(StudentByID, '/students/<int:id>')
api.add_resource(ClassByID, '/classes/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Signup, '/signup', endpoint='signup')

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