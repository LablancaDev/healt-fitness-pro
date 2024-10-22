import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import User from './User';
class Goal extends Model {
}
Goal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Nombre de la tabla del modelo User
            key: 'id',
        },
    },
    goal: {
        type: DataTypes.STRING,
        allowNull: false, // Objetivo inicial (perder peso, etc.)
    },
    desired_weight: {
        type: DataTypes.FLOAT,
        allowNull: true, // Será opcional en la primera inserción
    },
    desired_fat_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true, // Opcional
    },
    estimated_time: {
        type: DataTypes.INTEGER,
        allowNull: true, // Tiempo estimado para alcanzar el objetivo (en semanas o meses)
    },
    activity_date: {
        type: DataTypes.DATE,
        allowNull: true, // Fecha de la actividad diaria
    },
    activity_type: {
        type: DataTypes.STRING,
        allowNull: true, // Tipo de actividad (por ejemplo, correr, nadar)
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: true, // Duración de la actividad en minutos
    },
    calories_burned: {
        type: DataTypes.FLOAT,
        allowNull: true, // Calorías quemadas durante la actividad
    },
    calories_ingested: {
        type: DataTypes.FLOAT,
        allowNull: true, // Calorías consumidas durante el día
    },
    daily_weight: {
        type: DataTypes.FLOAT,
        allowNull: true, // Peso registrado diariamente
    },
}, {
    sequelize,
    modelName: 'Goal',
    tableName: 'goals',
    timestamps: true, // createdAt y updatedAt se generan automáticamente
});
// Relación con el modelo User
Goal.belongsTo(User, { foreignKey: 'user_id' });
export default Goal;
