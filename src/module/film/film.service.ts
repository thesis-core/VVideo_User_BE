import { Injectable } from '@nestjs/common';
import { FilmRepository } from './repository/film.repository';
import { Film } from './entity/film.entity';
import { Response } from '../../shares/interceptors/response.interceptor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const akamai_auth = require('../../shares/util/akamai-edgeAuth');

@Injectable()
export class FilmService {
    constructor(private filmRepository: FilmRepository) {}

    async getFilm(id: string): Promise<Response<Film>> {
        akamai_auth.setConfig({
            key: '7499d11b02b62dc167fe61796963272a',
            window: '3600',
        });

        const data = await this.filmRepository.findOneBy({ filmId: id });
        return {
            data,
            metadata: {
                expiry: akamai_auth.generateToken(),
            },
        };
    }
}
