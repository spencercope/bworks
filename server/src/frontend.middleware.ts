import {resolve} from "path";
import {Injectable, MiddlewareFunction, NestMiddleware} from "@nestjs/common";

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

const resolvePath = (file: string) => resolve(`../dist/client/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            const {url} = req;
            if (url.indexOf('api') === 1) {
                // it starts with /api --> continue with execution
                next();
            } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
                // it has a file extension --> resolve the file
                res.sendFile(resolvePath(url));
            } else {
                // in all other cases, redirect to the index.html!
                res.sendFile(resolvePath('index.html'));
            }
        };
    }
}
