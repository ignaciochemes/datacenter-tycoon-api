import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { importAllFromRequireContext } from "src/Helpers/Utilities/RequireContext";

@Module({
    imports: [
        TypeOrmModule.forFeature(importAllFromRequireContext(require.context('../Models/Entities/', true, /Entity\.ts$/))),
        JwtModule.register({})
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Services', true, /\.ts$/)),
        ...importAllFromRequireContext(require.context('../Daos/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true, /\.ts$/)),
    ],
    controllers: [
        ...importAllFromRequireContext(require.context('../Controllers', true, /\.ts$/))
    ],
    exports: [TypeOrmModule],
})
export class ApplicationModule { }