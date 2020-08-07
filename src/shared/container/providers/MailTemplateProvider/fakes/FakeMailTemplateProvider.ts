import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from "@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO"

class FakeMailTemplateProvider implements IMailTemplateProvider {

    public async parse(): Promise<string> {
        return 'mail content'
    }

}

export default FakeMailTemplateProvider
