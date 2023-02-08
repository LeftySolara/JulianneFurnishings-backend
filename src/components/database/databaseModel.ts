import { DataTypes, Model } from "sequelize";
import database from "@components/database";

abstract class DatabaseModel extends Model {
  declare uuid: string;

  declare slug: string;

  /** Database fields that all models have. */
  public static defaultFields = {
    uuidField: {
      field: "Uuid",
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      validate: {
        isUUID: 4,
      },
    },
    slugField: {
      field: "Slug",
      type: DataTypes.STRING,
      defaultValue: null,
      unique: true,
    },
  };

  /** Default options for all new models. */
  public static defaultInitOptions = {
    sequelize: database.db,
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  };

  /**
   * Generate a url-friendly slug from a uuid.
   *
   * @param uuid The uuid to generate the slug from.
   *
   * @returns A 16-character string.
   */
  public static generateSlug(uuid: string) {
    const encodedUUID = Buffer.from(uuid).toString("base64");
    const slug = encodedUUID
      .replace("=", "")
      .replace("+", "-")
      .replace("/", "-")
      .substring(0, 16);

    return slug;
  }
}

export default DatabaseModel;
