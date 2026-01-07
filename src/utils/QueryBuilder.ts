import { Query } from "mongoose";

const excludeFields = ["search", "sort", "fields", "page", "limit", "status"];

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };

    for (const field of excludeFields) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete filter[field];
    }

    this.modelQuery.find(filter);

    return this;
  }

  search(searchFields: string[]): this {
    const search = this.query.search || "";
    const searchQuery = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    };

    this.modelQuery.find(searchQuery);

    return this;
  }

  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "";

    this.modelQuery.select(fields);
    return this;
  }

  sort(): this {
    const sort = this.query.sort || "-createdAt";

    this.modelQuery.sort(sort);
    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
    const totalData = await this.modelQuery.model.find(this.modelQuery.getFilter()).countDocuments();

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;

    const totalPage = Math.ceil(totalData / limit);

    return {
      page,
      limit,
      totalPage,
      total: totalData,
    };
  }
}