"""added all relationships

Revision ID: 7fb4f4034692
Revises: 5cfc7a19b3bb
Create Date: 2024-09-27 15:27:44.357154

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fb4f4034692'
down_revision = '5cfc7a19b3bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('class_students',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=True),
    sa.Column('student_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], name=op.f('fk_class_students_class_id_classes')),
    sa.ForeignKeyConstraint(['student_id'], ['students.id'], name=op.f('fk_class_students_student_id_students')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('class_teachers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=True),
    sa.Column('teacher_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['classes.id'], name=op.f('fk_class_teachers_class_id_classes')),
    sa.ForeignKeyConstraint(['teacher_id'], ['teachers.id'], name=op.f('fk_class_teachers_teacher_id_teachers')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('activity_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_classes_activity_id_activities'), 'activities', ['activity_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('classes', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_classes_activity_id_activities'), type_='foreignkey')
        batch_op.drop_column('activity_id')

    op.drop_table('class_teachers')
    op.drop_table('class_students')
    # ### end Alembic commands ###
