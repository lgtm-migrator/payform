import { resolveConfig } from './resolve-config';
import { resolveInitConfig } from './resolve-init-config';
import { getOrigin } from '../../../get-origin';

jest.mock('./resolve-init-config');
jest.mock('../../../get-origin');

describe('resolveConfig', () => {

    describe('transport resolve', () => {
        const userConfig = {
            invoiceID: 'someID',
            invoiceAccessToken: 'some token'
        };
        const mockTransport = {
            on: jest.fn().mockImplementation((name: string, callback: any) => {
                callback(userConfig);
            }),
            emit: (): any => null,
            destroy: (): any => null
        };
        const resolveInitConfigMocked = resolveInitConfig as any;
        const getOriginMocked = getOrigin as any;

        it('should return transport resolved user config', () => {
            const expected = {
                initConfig: 'mockConfig',
                origin: 'https://checkout.rbk.money'
            };
            resolveInitConfigMocked.mockReturnValueOnce(expected.initConfig);
            getOriginMocked.mockReturnValueOnce(expected.origin);

            resolveConfig(mockTransport).then((actual) => {
                expect(actual).toEqual(expected);
                expect(resolveInitConfigMocked).toBeCalledWith(userConfig);
                expect(getOriginMocked).toBeCalled();
            });
        });

        it('should call transport on', () => {
            resolveConfig(mockTransport).then(() => {
                const actual = mockTransport.on.mock.calls[0][0];
                expect(actual).toEqual('init-payform');
            });
        });
    });
});
